import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Props {
  editname: string;
  editpriority: number;
  editDate: string;
  editId: number;
}

export default function EditTask({
  editname,
  editpriority,
  editDate,
  editId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [nameText, setNameText] = useState(editname);
  const [priorityText, setPriorityText] = useState(editpriority);
  const [dueDateText, setDueDateText] = useState(editDate);

  const client = axios.create({
    baseURL: "http://localhost:9090/api/tasks",
  });

  const handleEdit = async () => {
    try {
      const response = await client.put("/update/" + editId, {
        id: editId,
        name: nameText,
        state: "true",
        priority: priorityText,
        dueDate: dueDateText,
        doneDate: dueDateText,
      });
      console.log("Updated:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("There was an error updating the task!", error);
    }
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Edit Task
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
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
          <Button variant="contained" onClick={handleEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

