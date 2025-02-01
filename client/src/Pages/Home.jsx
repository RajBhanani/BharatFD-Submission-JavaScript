import { Routes, Route } from "react-router";
import { Box, styled } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import GetFAQ from "../Components/GetFAQ";
import CreateFAQ from "../Components/CreateFAQ";
import UpdateFAQ from "../Components/UpdateFAQ";
import DeleteFAQ from "../Components/DeleteFAQ";

const BodyBox = styled(Box)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
});

const Home = () => {
  return (
    <BodyBox>
      <Sidebar />
      <Routes>
        <Route path="/" element={<GetFAQ />} />
        <Route path="/create" element={<CreateFAQ />} />
        <Route path="/update" element={<UpdateFAQ />} />
        <Route path="/delete" element={<DeleteFAQ />} />
      </Routes>
    </BodyBox>
  );
};

export default Home;
