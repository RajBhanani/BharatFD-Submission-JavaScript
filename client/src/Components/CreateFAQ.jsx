import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";

const CreateFAQ = () => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/faqs/create", {
        question,
        answer,
      });
      if (response.data.statusCode === 200) {
        setQuestion("");
        setAnswer("");
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
      <Typography>Create a new FAQ</Typography>
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
          label="Question"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <ReactQuill
          theme="snow"
          value={answer}
          onChange={setAnswer}
          style={{ height: "100%", width: "100%" }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateFAQ;
