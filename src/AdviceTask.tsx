import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  taskId: number;
}


export default function AdviceTask({
  taskId,
}: Props) {
  const [open, setOpen] = useState(false);

  const [advice, setAdvice] = useState("");

  const client = axios.create({
    baseURL: "http://localhost:9090/api/tasks",
  });
  const handleAdvice = (
    idArg: number,

  ) => {
    client
      .get("/advice", {
        params: {
          id: idArg,
        },
      })
      .then((response) => {
        setAdvice(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };


  return (
    <>
      <Button variant="outlined" size="small" onClick={
            () => {setOpen(true)
                handleAdvice(taskId);
            }
            }>
        AI Advice
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>AI Advice</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            {advice ? advice : "Loading advice..."}
            </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
