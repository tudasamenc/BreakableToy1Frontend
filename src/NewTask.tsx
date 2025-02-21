import React, { useState } from "react";
import axios from "axios";
import "./NewTask.css";

export default function NewTask() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [priority, setPriority] = useState("");
  const [state, setState] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [doneDate, setDoneDate] = useState("");

  const handleNew = (
    nameArg: string,
    priorityArg: number,
    stateArg: String,
    dueDateArg: string
  ) => {
    {
    }
    client
      .post("", {
        name: nameArg,
        state: stateArg,
        priority: priorityArg,
        dueDate: dueDateArg,
        doneDate: dueDateArg,
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const client = axios.create({
    baseURL: "http://localhost:9090/api/tasks",
  });

  let nameText = " ";
  let priorityText = 0;
  let dueDateText = " ";
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        New Task
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>New Task</h2>
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
                  priorityText = Number(input.target.value);
                }}
              >
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
              </select>
            </a>
            <a>
              Due Date and Time
              <input
                type="datetime-local"
                id="birthdaytime"
                name="birthdaytime"
                onChange={(input) => {
                  dueDateText = input.target.value;
                }}
              ></input>
            </a>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button
              onClick={() => {
                handleNew(nameText, priorityText, "true", dueDateText);
                toggleModal();
              }}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
