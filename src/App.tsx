import "./App.css";
import axios from "axios";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
import EditTask from "./EditTask";

const client = axios.create({
  baseURL: "http://localhost:9090/api/tasks",
});

let nameText = " ";
let priorityText = " ";
let stateText = " ";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [state, setState] = useState("");

  const handleSearch = (
    nameArg: string,
    priorityArg: String,
    stateArg: String
  ) => {
    client
      .get("/find/" + nameArg + "." + priorityArg + "." + stateArg + "/", {
        params: {
          name,
          priority,
          state,
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
      <h2>Todo App</h2>
      <div className="card">
        <a>
          Name:
          <input
            type="text"
            onChange={(input) => {
              nameText = input.target.value;
            }}
          ></input>
        </a>
        <a>
          Priority:
          <select
            name="priority"
            id="pri"
            onChange={(input) => {
              priorityText = input.target.value;
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
              stateText = input.target.value;
            }}
          >
            <option value="%20">All</option>
            <option value="1">Done</option>
            <option value="0">Undone</option>
          </select>
          <button
            onClick={() => handleSearch(nameText, priorityText, stateText)}
          >
            Search
          </button>
        </a>
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
                <button onClick={() => handleDelete(task["id"])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Previous</button>
      <a> Current </a>
      <button>Next</button>
    </>
  );
}

export default App;
