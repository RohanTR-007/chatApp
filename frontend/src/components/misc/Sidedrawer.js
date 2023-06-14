import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Chatstate } from "../../context/Chatprovider";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Profilemodal from "./Profilemodal";
import axios from "axios";
import Chatloading from "./Chatloading";
import UserListItem from "../UserAvatar/UserListItem";

const Sidedrawer = () => {
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState();
  const { user, userState, setSelectedChat, chats, setchats } = Chatstate();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Pls enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/user?search=${search}`, config);
      setloading(false);
      setsearchResult(data);
    } catch (err) {
      console.log(err)
      toast({
        title: "Error occured",
        description: "Error occurerd during searching",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
        
      });
    }
  };
  const accessChat = async(userID)=>{
    try{
      setloadingChat(true) 

      const config={
        headers:{
          "Content-type":"Application/json",
          Authorization:`Bearer ${user.token}`
        }
      };

      const {data} = await axios.post("/chats" ,{userID},config)

      console.log(data)

      if(!chats.find((c) => c._id === data._id))setchats([data,...chats]);

      setloadingChat(false)
      setSelectedChat(data)
      onClose()
    }
    catch(err)
    {
      toast ({
        title: "Error in fetching chats",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
    });
    }
  }

  // console.log(user);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        bg="white"
        alignItems="center"
        px="5px 10px"
        borderWidth={"5px"}
        borderRadius="5px"
      >
        <Tooltip label="search" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
            {/* For small screens text : dis :none For medium screens it is visible */}
          </Button>
        </Tooltip>
        <Text>Talkitive</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={"1"} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} m={"1"}>
              <Avatar
                size={"sm"}
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <Profilemodal user={user}>
                {/* sending user as props to Profilemodal component*/}
                <MenuItem>Profile</MenuItem>
              </Profilemodal>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (<Chatloading />) : (searchResult?.map((user)=> 
            (<UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>))
            )}
            {loadingChat && <Spinner ml="auto" display="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidedrawer;
