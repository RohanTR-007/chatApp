import React from "react";
import { useEffect,useState  } from "react";
import {BrowserRouter, useHistory} from "react-router-dom"
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import "./index.css";
import Login from "../components/authentcation/Login";
import SignUp from "../components/authentcation/SignUp";
const Home = () => {
    const  history = useHistory()
    useEffect(() => {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if(userinfo) {
        history.push("/chats");
        // window.location.reload();
      }
    }, [history]);
    
    
  return (
    <Container>
      <Box className="box">
        <Text className="text">Talk M</Text>
      </Box>
      <Box bg={"white"} w="100%" p="4" borderRadius={"lg"}>
        <Tabs variant="soft-rounded" colorScheme="messenger">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
