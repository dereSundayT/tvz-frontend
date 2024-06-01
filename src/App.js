import logo from './logo.svg';
import './App.css';
import {Box} from "@chakra-ui/react";
import {UserTestDashboard} from "./pages/user";
import {Outlet} from "react-router-dom";


function App() {
  return (
  <Box minH={"100vh"} bg={"#0f0a19"} color={"gray.500"} px={6} py={8}>
    <Outlet/>
  </Box>
  );
}

export default App;
