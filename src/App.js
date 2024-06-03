import logo from './logo.svg';
import './App.css';
import {Box} from "@chakra-ui/react";
import {UserTestDashboard} from "./pages/user";
import {Outlet} from "react-router-dom";


function App() {
  return (
      //px={6} py={8}
      //bg={"#0f0a19"} color={"gray.500"}
  // <Box minH={"100vh"} >
      <div>
        <Outlet/>
      </div>

  // </Box>
  );
}

export default App;
