import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import { ExpandMore } from "@mui/icons-material";

const GetFAQ = () => {
  const [lang, setLang] = useState("en");
  const [faqs, setFaqs] = useState([]);
  const [find, setFind] = useState("all");
  const [ID, setID] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      setLoading(true);
      const url =
        find === "all"
          ? `/api/v1/faqs?lang=${lang}`
          : `/api/v1/faqs/${ID}?lang=${lang}`;
      const res = await axios.get(url);
      if (find === "one") setFaqs([res.data.data]);
      setFaqs(res.data.data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getFAQs = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/faqs");
        setFaqs(res.data.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getFAQs();
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
        gap: "40px",
      }}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <RadioGroup
            style={{ display: "flex", flexDirection: "row" }}
            value={find}
            onChange={(e) => {
              setFind(e.target.value);
            }}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Get all FAQs"
            />
            <FormControlLabel
              value="one"
              control={<Radio />}
              label="Get one FAQ by ID"
            />
          </RadioGroup>

          <TextField
            label="Enter FAQ ID"
            disabled={find === "all"}
            onChange={(e) => setID(e.target.value)}
          />
          <FormControl style={{ width: "150px" }}>
            <InputLabel htmlFor="lang-select">Language</InputLabel>
            <Select
              name="lang-select"
              value={lang}
              label="Language"
              onChange={(e) => setLang(e.target.value)}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"hi"}>Hindi</MenuItem>
              <MenuItem value={"gu"}>Gujarati</MenuItem>
              <MenuItem value={"mr"}>Marathi</MenuItem>
              <MenuItem value={"bn"}>Bengali</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" style={{ height: "40px" }}>
            Search
          </Button>
        </FormControl>
      </form>
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          gap: "40px",
          overflowX: "auto",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography>An error occured</Typography>
        ) : faqs.length === 0 ? (
          <Typography>
            There are no FAQs available. Add some to see them here
          </Typography>
        ) : (
          faqs.map((faq) => (
            <Accordion key={faq.id} style={{ width: "100%" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Question: {faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize={13}>ID: {faq.id}</Typography>
                <Typography> Answer: </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.answer),
                  }}
                />
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </Box>
  );
};

export default GetFAQ;
