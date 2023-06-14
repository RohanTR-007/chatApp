import { createContext, useContext, useState,useEffect } from "react";
import {useHistory} from "react-router-dom"

const Chatcontext = createContext()

const Chatprovider =({children})=>
{   
    const [user, setuser] = useState()
    const [SelectedChat, setSelectedChat] = useState()
    const [chats, setchats] = useState([])
    const history = useHistory()
    
    useEffect(() => {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      setuser(userinfo);
      if (!userinfo) {
        history.push("/")
      } 
    //   else
    //   {
    //       history.push('/chats')
    //   }
    }, [history])
    
    return (
      <Chatcontext.Provider
        value={{
          user,
          setuser,
          SelectedChat,
          setSelectedChat,
          chats,
          setchats
        }}
      >
        {children}
      </Chatcontext.Provider>
    );
}

export const Chatstate = ()=>{
    return useContext(Chatcontext);
}
export default Chatprovider;

