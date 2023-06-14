import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, useToast, Stack, Text } from "@chakra-ui/react";
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";
import { getSender } from '../../config/ChatLogic';
import { Chatstate } from '../../context/Chatprovider';
import Chatloading from './Chatloading';

function Mychats() {
  const { user, setuser, SelectedChat, setSelectedChat, chats, setchats } =
    Chatstate();
  const [loggedUser, setloggedUser] = useState()
  const toast = useToast();
  const fetchChats = async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get('/chats',config)
      console.log(data+"--api--")
      setchats(data)
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }
  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, []);
  return (
    <Box
      display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work Sans"
        display={"flex"}
        w="100%"
        justifyContent="space-between"
        alignItems={"center"}
      >
        My Chats
        {/* <GroupChatModal> */}
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        {/* </GroupChatModal> */}
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={SelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={SelectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {console.log(chats)}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
              </Box>
            ))}
          </Stack>
        ) : (
          <Chatloading />
        )}
      </Box>
    </Box>
  );
}

export default Mychats;