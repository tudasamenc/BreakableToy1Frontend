import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Todo App</h1>
      <div className="card">
        <a>
          Name:<input type="text"></input>
        </a>
        <a>
          Priority:
          <select name="priority" id="pri">
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </a>
        <a>
          State:{" "}
          <select name="State" id="state">
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
          <button>Search</button>
        </a>
      </div>
      <button>+ New To Do</button>
      <table>
        <tr>
          <th>
            <input type="checkbox"></input>
          </th>
          <th>Name</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </table>
      <button>Previous</button>
      <a> Current </a>
      <button>Next</button>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
