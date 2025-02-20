import React, { useState } from "react";
import "./NewTask.css";

export default function NewTask() {
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

  let nameText = " ";
  let priorityText = " ";
  //let stateText = " ";
  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        + New Task
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Register New Task</h2>
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
              Due Date and Time
              <input
                type="datetime-local"
                id="birthdaytime"
                name="birthdaytime"
              ></input>
            </a>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button onClick={toggleModal}>SAVE</button>
          </div>
        </div>
      )}
    </>
  );
}
