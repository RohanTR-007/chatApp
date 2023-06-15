import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Chatstate } from "../../context/Chatprovider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setfetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, SelectedChat, setSelectedChat, chats, setchats } = Chatstate();

  const [groupChatName, setgroupChatName] = useState("");
  const [search, setsearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [loading, setloading] = useState(false);
  const [renameLoading, setrenameLoading] = useState(false);

  const toast = useToast();

  const handleDelete = async (delUserID, delChat) => {
    //Checking if logged user is admin or not
    //and checking for leave group
    if (SelectedChat.groupAdmin.map((u) => u._id !== user._id)  && delUserID !== user._id)   {
      //1. Not admin 
      toast({
        title: "Only Group admin can remove",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      //Admin or leave group (removing yourself from group)
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/removeuser",
        {
          chatID: delChat._id,
          userID: delUserID,
        },
        config
      );
      delUserID === user._id ? setSelectedChat() : setSelectedChat(data);
      setloading(false)
      setfetchAgain(!fetchAgain)
      console.log(data);
    } catch (error) {
      toast({
        title: "Error in removing user",
        description:error.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      }); 
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
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
      setrenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/rename",
        {
          chatID: SelectedChat._id,
          groupName: groupChatName,
        },
        config
      );
      console.log(data);
      setSelectedChat(data);
      setfetchAgain(fetchAgain);
      setrenameLoading(false);
    } catch (err) {
      toast({
        title: "Error occured",
        description: "Failed to rename group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setrenameLoading(false);
    setgroupChatName("");
  };

  const handleSearch = async(query) => {
    setsearch(query);
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
      setloading(false);
      let tmp=[]
      let user_ids=[]
      SelectedChat.users.forEach(ele => {
        user_ids.push(ele._id); 
      });
      data.forEach(ele => {
        if(!user_ids.includes(ele._id))
        {
          tmp.push(ele)
        }
      });
      setsearchResults(tmp)
      console.log(searchResults)
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

  const handleAddUser = async(user1)=>{
    if(SelectedChat.users.find((u)=>u._id === user1._id))
    {
         toast({
           title: "User already in group",
           status: "error",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         return;
    }
    console.log(SelectedChat.groupAdmin[0]._id);
    console.log(user._id);
    if(SelectedChat.groupAdmin[0]._id !== user._id)
    {
        toast({
          title: "Only admins can add",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
    }
    try
    {
        setloading(true)
        const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/chats/addgroup",
        {
          chatID:SelectedChat._id,
          userID:user1._id
        },
        config
      );
      setSelectedChat(data);
      setloading(false)
    }
    catch(err)
    {
        toast({
          title: "Error occured in adding user",
          description: err.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
    }
  }

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        onClick={onOpen}
        icon={<ViewIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{SelectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDirection="row">
              {SelectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u._id, SelectedChat)}
                />
              ))}
            </Box>
            <FormControl
              display="flex"
              justifyContent={"center"}
              flexDirection="row"
            >
              <Input
                placeholder="chat name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setgroupChatName(e.target.value)}
                border="1px solid black"
                overflowX={"visible"}
              />
              <Button
                bg="#c0c7c9"
                border={"1px solid #c0c7c9"}
                onClick={handleRename}
                ml={1}
                isLoading={renameLoading}
              >
                <Text p={2}>Rename Group</Text>
              </Button>
            </FormControl>
            <FormControl
              display="flex"
              justifyContent={"center"}
              flexDirection="row"
            >
              <Input
                placeholder="Add user to group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
                border="1px solid black"
              />
            </FormControl>
            {loading ? (
              <Spinner />
            ) : (
              
              searchResults.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter display="flex" justifyContent={"center"}>
            {/* {loading?(<Spinner />):(<></>)} */}
            <Button
              onClick={() => handleDelete(user._id, SelectedChat)}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
