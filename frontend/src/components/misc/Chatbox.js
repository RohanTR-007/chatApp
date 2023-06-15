import { Box } from "@chakra-ui/react";
import React from "react";
import { Chatstate } from "../../context/Chatprovider";
import SingleChat from "../SingleChat";

const Chatbox = ({ fetchAgain, setfetchAgain }) => {
  const { SelectedChat } = Chatstate();
  return (
    <Box
      display={{ base: SelectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
    </Box>
  );
};

export default Chatbox;
