import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const client = axios.create({
  baseURL: "http://localhost:9090/api/tasks",
});

function App() {
  let nameText = " ";
  let priorityText = " ";
  let stateText = " ";

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
        console.log(nameArg);
        console.log(priorityArg);
        console.log(stateArg);
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
  /*
  const handleUpdate = (id: number) => {
    client
      .put("/update/" + id)
      .then((response) => {
        setTasks(tasks.filter((task) => task["id"] !== id));
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };
  */

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
      <button>+ New To Do</button>
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
                <input type="checkbox" checked={task["Done"]}></input>
              </td>
              <td>{task["Name"]}</td>
              <td>{task["priority"]}</td>
              <td>{task["dueDate"]}</td>
              <td>
                <button>Edit</button>
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
