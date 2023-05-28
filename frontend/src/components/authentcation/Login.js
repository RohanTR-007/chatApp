import { VStack, Button ,useToast,} from "@chakra-ui/react";
import React from "react";
import Form from "./Form";
import { useState } from "react";
import Passwordcomponent from "./Passwordcomponent";
import { useHistory } from "react-router-dom";
import axios from "axios"

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleChange = (event) => { 
    const label = event.target.name;
    const val = event.target.value;
    
    if (label === "Email") {
      setemail(val);
      
    } else if (label === "Password") {
      setpassword(val);
    }
  };

  const SubmitHandler = async() => {
    setPicLoading(true);
    console.log("emial :" + email);
    if(!email || !password)
    {
      toast({
        title: "Please Enter all details!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false)
      return
    }
    try
    {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user/login",
        { email, password},   
        config
      );
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats")
    }
    catch(error){
      console.log(error.response.data);
      toast({
        title: "Error occured",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  
  return (
    <VStack>
      <Form label="Email" handleChange={handleChange} />
      <Passwordcomponent label="Password" handleChange={handleChange} />
      <Button
        colorScheme={"blue"}
        width="100%"
        marginTop="10px"
        onClick={SubmitHandler}
        isLoading={picLoading}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
