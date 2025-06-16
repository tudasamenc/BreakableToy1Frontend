import "./App.css";
import TextPressure from './TextPressure';
import axios from "axios";
import AdviceTask from "./AdviceTask";
import NewTask from "./NewTask";
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Spline from '@splinetool/react-spline';
import EditTask from "./EditTask";

// Axios client
const client = axios.create({
  baseURL: "http://localhost:9090/api/tasks",
});

// Search/filter variables
let nameText = " ";
let doneFilter = false;
let doneFilterValue = false;
let priorityFilter = false;
let priorityValue = 0;
let currentpage = 0;
let totalPages = 0;
let globalSortVar = 0;
let globalAsc = true;

// Dark Theme with smaller fonts
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1c1c1c',
      paper: '#121212',
    },
    primary: {
      main: '#2196f3',
    },
    text: {
      primary: '#2196f3',
      secondary: '#90caf9',
    },
  },
  typography: {
    fontSize: 14,
    h6: {
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
    allVariants: {
      color: '#2196f3',
    },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState([]);

  const format = (hours: number) => {
    const days = Math.floor(hours / 24);
    const hrs = Math.round(hours % 24);
    return `${days}d ${hrs}h`;
  };

  const handleStats = () => {
    client
      .get("/stats", {
      })
      .then((response) => {
        setStats(response.data);
        console.log("Stats:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  const handleTotalPages = () => {
    client
      .get("/count", {
      })
      .then((response) => {
        totalPages = response.data;
        console.log("Total pages:", totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching the total pages!", error);
      });
  };
  const handleSearch = (
    nameArg: string,
    pageArg: number,
    filterDoneArg: boolean,
    doneArg: boolean,
    priorityArg: boolean,
    priorityValue: number,
    sortVarArg: number,
    ascArg: boolean
  ) => {
    client
      .get("/paginated", {
        params: {
          page: pageArg,
          size: 10,
          sortvar: sortVarArg,
          asc: ascArg,
          query: nameArg,
          filterDone: filterDoneArg,
          done: doneArg,
          filterPriority: priorityArg,
          priority: priorityValue,
        },
      })
      .then((response) => {
        setTasks(response.data);
        handleTotalPages();
        handleStats();
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

    const handleDone = async (
      id: number,
      doneState: boolean
    ) => {
    try {
      await client.put("/update/" + id, {
        id: id,
        done: doneState,
      });
    } catch (error) {
      console.error("There was an error updating the task!", error);
    }
  }




  // Delete task handler
  // This function deletes a task by its ID and updates the state

  const handleDelete = (id: number) => {
    client
      .delete("/delete/" + id)
      .then(() => {
        setTasks(tasks.filter((task) => task["id"] !== id));
        handleTotalPages();
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  useEffect(() => {
    handleSearch("", 0, doneFilter, doneFilterValue, priorityFilter, priorityValue,0, true);
    handleTotalPages();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Box
          sx={{
            position: {
              xs: "relative",
              lg: "absolute",
            },
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        >
          <TextPressure
            text="Taskerr"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#2196f3"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </Box>

        {/* Background Spline */}
        <Box position="absolute" top={0} left={0} width="100vw" height="100vh" zIndex={-1}>
          <Spline scene="https://prod.spline.design/D2VraFAA43auMbjT/scene.splinecode" />
        </Box>

        <Box p={4}>
          {/* Search Panel */}
          <Box display="flex" justifyContent="right">
            <Paper elevation={6} sx={{ p: 3, mb: 4, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search by name"
                    variant="outlined"
                    onChange={(input) => {
                      nameText = input.target.value;
                    }}
                  />
                </Grid>

                <Grid>
                  <FormControl fullWidth size="small">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      defaultValue="%20"
                      onChange={(e) => {
                        priorityFilter = e.target.value !== "%20";
                        priorityValue = e.target.value === "%20" ? 0 : Number(e.target.value);
                      }}
                      label="Priority"
                    >
                      <MenuItem value="%20">All</MenuItem>
                      <MenuItem value="3">High</MenuItem>
                      <MenuItem value="2">Medium</MenuItem>
                      <MenuItem value="1">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      defaultValue="%20"
                      onChange={(e) => {
                        doneFilter = e.target.value !== "%20";
                        doneFilterValue = e.target.value === "1";
                      }}
                      label="Status"
                    >
                      <MenuItem value="%20">All</MenuItem>
                      <MenuItem value="1">Done</MenuItem>
                      <MenuItem value="0">Undone</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,0, globalAsc)
                    }
                  >
                    Search
                  </Button>
                  <NewTask />
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Task Table */}
          <Paper
            elevation={6}
            sx={{
              mb: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              maxHeight: 450,
              overflowY: 'auto',
              overflowX: 'auto',
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={
                    () => {
                      globalAsc = !globalAsc;
                      globalSortVar = 2; // 
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                    }
                  }>Done</Button></TableCell>
                  <TableCell><Button onClick={
                    () => {
                      globalAsc = !globalAsc;
                      globalSortVar = 3; // Sort by name
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                    }
                  }>Name</Button></TableCell>
                  <TableCell><Button onClick={
                    () => {
                      globalAsc = !globalAsc;
                      globalSortVar = 1; // Sort by priority
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                    }
                  }>Priority</Button></TableCell>
                  <TableCell><Button onClick={
                    () => {
                      globalAsc = !globalAsc;
                      globalSortVar = 4; // Sort by due date
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                    }
                  }>Due Date</Button></TableCell>
                  <TableCell><Button onClick={
                    () => {
                      globalAsc = !globalAsc;
                      globalSortVar = 4; // Sort by days left
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                    }
                  }>Days Left</Button></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task["id"]}>
                    <TableCell>
                      <Checkbox checked={task["done"]} onClick={
                        () => {
                          handleDone(task["id"], !task["done"]);
                          console.log("Task done status changed:", task["done"]);
                          handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc); 
                        }
                      } />
                    </TableCell>
                    <TableCell>
                    <span style={{ textDecoration: task["done"] ? "line-through" : "none" }}>
                      {task["name"]}
                    </span>
                  </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            task["priority"] === 3
                              ? 'rgba(255, 0, 0, 0.45)' // High priority red
                              : task["priority"] === 2
                              ? 'rgba(255, 0, 0, 0.21)' // Medium priority orange
                              : task["priority"] === 1
                              ? 'rgba(128, 0, 0, 0.15)' // Low priority green
                              : 'gray',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          width: 70,
                        }}
                      >
                        {task["priority"] === 3
                          ? "High"
                          : task["priority"] === 2
                          ? "Medium"
                          : task["priority"] === 1
                          ? "Low"
                          : "Unknown"}
                      </Box>
                    </TableCell>
                    <TableCell>{dayjs(task["dueDate"]).format('MMM D, YYYY h:mm A')}</TableCell>
                    <TableCell>
                      {(() => {
                        const now = dayjs();
                        const due = dayjs(task["dueDate"]);
                        const diff = due.diff(now, 'day');
                        return diff >= 0 ? `${diff} day(s) left` : `Overdue by ${Math.abs(diff)} day(s)`;
                      })()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <EditTask
                          editId={task["id"]}
                          editname={task["name"]}
                          editpriority={task["priority"]}
                          editDate={task["dueDate"]}
                          editState={task["done"]}
                        />
                        <AdviceTask
                          taskId={task["id"]}
                          />
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(task["id"])}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" size="small" onClick={
              () => {
                if (currentpage > 0) {
                  currentpage -= 1;
                  handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                }
              }
            }>Previous</Button>
            <Typography variant="body1" display="flex" alignItems="center">Current</Typography>
            <Button variant="outlined" size="small" onClick={
              () => {
                if (currentpage < Math.ceil(totalPages / 10) - 1) {
                  currentpage += 1;
                  console.log("Current page:", currentpage);
                  handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue,globalSortVar, globalAsc);
                }
              }
            }>Next</Button>
          </Box>
          <Box display="flex" justifyContent="center" mt={2} fontSize="0.8rem" color="#90caf9">
            {currentpage + 1} / {Math.ceil(totalPages / 10)} pages
          </Box>

          <Paper elevation={4} sx={{ mt: 4, p: 2, backgroundColor: 'rgba(0,0,0,0.6)', color: '#90caf9' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              ⏱ Average Completion Times
            </Typography>
            <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={2}>
              <Box textAlign="center">
                <Typography variant="body2"> Overall</Typography>
                <Typography variant="subtitle2">{format(stats.overallAverageHours)}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="body2"> Priority 1 (Low)</Typography>
                <Typography variant="subtitle2">{format(stats.priority1AverageHours)}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="body2"> Priority 2 (Medium)</Typography>
                <Typography variant="subtitle2">{format(stats.priority2AverageHours)}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="body2"> Priority 3 (High)</Typography>
                <Typography variant="subtitle2">{format(stats.priority3AverageHours)}</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </>
    </ThemeProvider>
  );
}

export default App;

