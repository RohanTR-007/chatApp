import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Chatstate } from "../../context/Chatprovider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setgroupChatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setsearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const { user, chats, setchats } = Chatstate();

  const handleSearch = async (query) => {
    setsearch(query)
    if (!query) {
      return;
    }
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/user?search=${query}`, config);
      console.log(data);
      setloading(false);
      setsearchResults(data);
    } catch (error) {
      toast({
        title: "Error occured in searching user",
        description: error.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubmit = async() => {
    if(!groupChatName || !selectedUsers)
    {
      toast({
        title: "Pls fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      }
      const {data} = await axios.post('/chats/group',{
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=>u._id)),
      },config)
      setchats([data,...chats])
      onClose()
      toast({
        title: "Successfully Created Group Chat",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error is creating group",
        description:error.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleGroup = (userToadd) => {
    if (selectedUsers.includes(userToadd)) {
      toast({
        title: "User already selected",
        description: "User exists",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setselectedUsers([...selectedUsers, userToadd]); //If user is not selected append user
  };
  const handleDelete = (delUser) => {
    setselectedUsers(selectedUsers.filter((sel)=>sel._id !== delUser._id))
    // filter creates a new array and store all user except delUser, later assign them to  setselectedUsers
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily="Work Sans"
            display="flex"
            justify-content="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            alignItems="center"
            flexDirection={"column"}
          >
            <FormControl>
              <Input
                placeholder="Group Chat name "
                mb={3}
                onChange={(e) => setgroupChatName(e.target.value)}
                border={"1px solid black"}
              />
              <Input
                placeholder="Select users eg:walter,tate mowa"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
                border={"1px solid black"}
              />
            </FormControl>
            {/* to render selected users */}
            <Box display="flex" flexDirection={"row"} flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {/* to render search users */}
            {loading ? (
              <span>Loading</span>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
