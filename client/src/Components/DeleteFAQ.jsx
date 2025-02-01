import { useState } from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";

const DeleteFAQ = () => {
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    try {
      const response = await axios.delete(`/api/v1/faqs/delete/${id}`);
      if (response.data.statusCode === 200) {
        setId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
        gap: "40px",
        overflow: "auto",
      }}
    >
      <Typography>Delete an FAQ</Typography>
      <FormControl
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <TextField
          fullWidth
          label="ID"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default DeleteFAQ;
