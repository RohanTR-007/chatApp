import { Box } from "@chakra-ui/react";
import {Chatstate} from '../context/Chatprovider'
import Sidedrawer  from "../components/misc/Sidedrawer";
import Mychats from "../components/misc/Mychats";
import Chatbox from "../components/misc/Chatbox";
import { useState } from "react";
const Chats = () => {

  const { user, userState} = Chatstate();
  const [fetchAgain, setfetchAgain] = useState(false)
  return (
    <div width="100%">
      {/* {console.log(user)} */}
      {user && <Sidedrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        width="100%"
        h={"91.5vh"}
        p="10px"
      >
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
