import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";

const UpdateFAQ = () => {
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const update = {};
      if (question.trim() !== "") update.question = question;
      if (answer.trim() !== "<p><br></p>" && answer.trim() !== "")
        update.answer = answer;
      if (Object.keys(update).length === 0) return;
      const response = await axios.put("/api/v1/faqs/update", {
        id: id,
        update,
      });
      if (response.data.statusCode === 201) {
        setQuestion("");
        setAnswer("");
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
      <Typography>Update an FAQ</Typography>
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
        <TextField
          fullWidth
          label="Question"
          value={question}
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

export default UpdateFAQ;
