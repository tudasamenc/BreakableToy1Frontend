import "./App.css";
import axios from "axios";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Spline from '@splinetool/react-spline';
import EditTask from "./EditTask";

const client = axios.create({
  baseURL: "http://localhost:9090/api/tasks",
});

let nameText = " ";
let doneFilter= false;
let doneFilterValue = false;
let priorityFilter = false;
let priorityValue = 0;


function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [state, setState] = useState("");

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
          sortvar:0,
          asc:true,
          query:nameArg,
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
      .then((response) => {
        setTasks(tasks.filter((task) => task["id"] !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <>
      <h2>Taskify</h2>
      <div className="card">
            <div style={{position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1}}>
                <Spline scene="https://prod.spline.design/D2VraFAA43auMbjT/scene.splinecode" />
            </div>
        <Box>
        <Box>
          Name:
          <input
            type="text"
            onChange={(input) => {
              nameText = input.target.value;
            }}
          ></input>
        </Box>
        <a>
          Priority:
          <select
            name="priority"
            id="pri"
            onChange={(input) => {
              priorityFilter = input.target.value === "%20" ? false : true;
              priorityValue = input.target.value === "%20" ? 0 : Number(input.target.value);
            }}
          >
            <option value="%20">All</option>
            <option value="3">High</option>
            <option value="2">Medium</option>
            <option value="1">Low</option>
          </select>
        </a>
        <a>
          State:
          <select
            name="State"
            id="state"
            onChange={(input) => {
              doneFilter = input.target.value === "%20" ? false : true;
              doneFilterValue = input.target.value === "1" ? true : false;
            }}
          >
            <option value="%20">All</option>
            <option value="1">Done</option>
            <option value="0">Undone</option>
          </select>
          <Button variant="contained"
            onClick={() => handleSearch(nameText,0, doneFilter, doneFilterValue, priorityFilter, priorityValue)}
          >
            Search
          </Button>
          
        </a>
        </Box>
      </div>
      <NewTask />
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task["id"]}>
              <td>
                <input type="checkbox" checked={task["done"]}></input>
              </td>
              <td>{task["name"]}</td>
              <td>{task["priority"]}</td>
              <td>{task["dueDate"]}</td>
              <td>
                <EditTask
                  editId={task["id"]}
                  editname={task["name"]}
                  editpriority={task["priority"]}
                  editDate={task["dueDate"]}
                />
                <Button variant="contained" onClick={() => handleDelete(task["id"])}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="contained">Previous</Button>
      <a> Current </a>
      <Button variant="contained">Next</Button>
    </>
  );
}

export default App;
