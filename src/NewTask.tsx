import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function NewTask() {
  const [open, setOpen] = useState(false);
  const [nameText, setNameText] = useState("");
  const [priorityText, setPriorityText] = useState(2); // Default: Medium
  const [dueDateText, setDueDateText] = useState("");

  const client = axios.create({
    baseURL: "http://localhost:9090/api/tasks",
  });

  const handleNew = async () => {
    try {
      const response = await client.post("", {
        name: nameText,
        state: "true",
        priority: priorityText,
        dueDate: dueDateText,
        doneDate: dueDateText,
      });
      console.log("Created:", response.data);
      setOpen(false);
      setNameText("");
      setPriorityText(2);
      setDueDateText("");
    } catch (error) {
      console.error("There was an error creating the task!", error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Task
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityText}
              label="Priority"
              onChange={(e) => setPriorityText(Number(e.target.value))}
            >
              <MenuItem value={3}>High</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={1}>Low</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Due Date and Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={dueDateText}
            onChange={(e) => setDueDateText(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleNew}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
