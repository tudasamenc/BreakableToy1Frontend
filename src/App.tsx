import "./App.css";
import TextPressure from './TextPressure';
import axios from "axios";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
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

  const handleSearch = (
    nameArg: string,
    pageArg: number,
    filterDoneArg: boolean,
    doneArg: boolean,
    priorityArg: boolean,
    priorityValue: number
  ) => {
    client
      .get("/paginated", {
        params: {
          page: pageArg,
          size: 10,
          sortvar: 0,
          asc: true,
          query: nameArg,
          filterDone: filterDoneArg,
          done: doneArg,
          filterPriority: priorityArg,
          priority: priorityValue,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  const handleDelete = (id: number) => {
    client
      .delete("/delete/" + id)
      .then(() => {
        setTasks(tasks.filter((task) => task["id"] !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  useEffect(() => {
    handleSearch("", 0, doneFilter, doneFilterValue, priorityFilter, priorityValue);
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
                <Grid item xs={12} sm={4}>
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

                <Grid item xs={6} sm={2}>
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

                <Grid item xs={6} sm={2}>
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

                <Grid item xs={12} sm={4} display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue)
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
              maxHeight: 600,
              overflowY: 'auto',
              overflowX: 'auto',
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell><Checkbox disabled /></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Priority</b></TableCell>
                  <TableCell><b>Due Date</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task["id"]}>
                    <TableCell>
                      <Checkbox checked={task["done"]} disabled />
                    </TableCell>
                    <TableCell>{task["name"]}</TableCell>
                    <TableCell>
                      {task["priority"] === 3
                        ? "High"
                        : task["priority"] === 2
                        ? "Medium"
                        : task["priority"] === 1
                        ? "Low"
                        : task["priority"]}
                    </TableCell>
                    <TableCell>{task["dueDate"]}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <EditTask
                          editId={task["id"]}
                          editname={task["name"]}
                          editpriority={task["priority"]}
                          editDate={task["dueDate"]}
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
                  handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue);
                }
              }
            }>Previous</Button>
            <Typography variant="body1" display="flex" alignItems="center">Current</Typography>
            <Button variant="outlined" size="small" onClick={
              () => {
                
                  currentpage += 1;
                  console.log("Current page:", currentpage);
                  handleSearch(nameText, currentpage, doneFilter, doneFilterValue, priorityFilter, priorityValue);
                
              }
            }>Next</Button>
          </Box>
          <Box display="flex" justifyContent="center" mt={2} fontSize="0.8rem" color="#90caf9">
            {currentpage + 1} / {Math.ceil(tasks.length / 10)} pages
          </Box>
        </Box>
      </>
    </ThemeProvider>
  );
}

export default App;

