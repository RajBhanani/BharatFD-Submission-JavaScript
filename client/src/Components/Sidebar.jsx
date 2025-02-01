import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Paper style={{ height: "100vh", width: "20vw" }}>
      <Box
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "Highlight",
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        <Typography color="white" fontSize="20px">
          Select an option
        </Typography>
      </Box>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography>Get FAQs</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/create");
            }}
          >
            <Typography>Create FAQ</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/update");
            }}
          >
            <Typography>Update FAQ</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/delete");
            }}
          >
            <Typography>Delete FAQ</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Sidebar;
