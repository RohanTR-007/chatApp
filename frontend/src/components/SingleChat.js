import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { getSender, getSenderFull } from "../config/ChatLogic";
import { Chatstate } from "../context/Chatprovider";
import Profilemodal from "./misc/Profilemodal";
import UpdateGroupChatModal from "./misc/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setfetchAgain }) => {
  const { user, SelectedChat, setSelectedChat } = Chatstate();
  return (
    <>
      {SelectedChat ? (
        <>
          <Text
            fontSize={{ base: "20px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!SelectedChat.groupChat ? (
              <>
                {getSender(user, SelectedChat.users)}
                <Profilemodal user={getSenderFull(user, SelectedChat.users)} />
              </>
            ) : (
              <>
                {SelectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setfetchAgain={setfetchAgain}
                />
              </>
            )}
          </Text>
          {/* {message box} */}
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"flex-end"}
            p={3}
            bg="#c0c7c9"
            h="100%"
            w="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* messages */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          width={"100%"}
          height="100%"
        >
          <Text fontSize={"25px"}>Select user to start chat</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
