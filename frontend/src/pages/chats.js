import { Box } from "@chakra-ui/react";
import {Chatstate} from '../context/Chatprovider'
import Sidedrawer  from "../components/misc/Sidedrawer";
import Mychats from "../components/misc/Mychats";
import Chatbox from "../components/misc/Chatbox";
const Chats = () => {

  const { user, userState} = Chatstate();
  return (
    <div width="100%">
      {/* {console.log(user)} */}
      {user && <Sidedrawer />}
      <Box d="flex" justifyContent={"space-between"} width="100%" h={"91.5vh"} p="10px">
        {user && <Mychats />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
};

export default Chats;
