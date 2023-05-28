import React from "react";
import { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import Form from "./Form";
import Passwordcomponent from "./Passwordcomponent";
import {useHistory} from "react-router-dom";
import axios from "axios"

function SignUp() {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirm_password, setconfirm_password] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const history = useHistory(); 

  const handleChange = (event) => {
    const label = event.target.name;
    const val = event.target.value;
    if (label === "Name") {
      setname(val);
      // console.log(name);
    } else if (label === "Email") {
      setemail(val);
      // console.log(email);
    } else if (label === "Password") {
      setpassword(val);
    } else if (label === "confirmPassword") {
      setconfirm_password(val);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false); 
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dlnoegbhv");
      fetch("https://api.cloudinary.com/v1_1/dlnoegbhv/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  const SubmitHandler = async() => {
    setPicLoading(true);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(pic);
    if (!name || !email || !password) {
      toast({
        title: "Please Enter all details!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    } else if (password !== confirm_password) {
      toast({
        title: "Password fields aren't matching",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/user",
        { name, email, password, pic },   
        config
      );
      toast({
        title: "Registration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats")
    } catch (err) {
      toast({
        title: "Error occured",
        description: err.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setPicLoading(false); 
  };

  return (
    <VStack spacing={"5px"}>
      <Form label="Name" handleChange={handleChange} />
      <Form label="Email" handleChange={handleChange} />
      <Passwordcomponent label="Password" handleChange={handleChange} />
      <Passwordcomponent label="confirmPassword" handleChange={handleChange} />
      <FormControl id="pic">
        {/*Bro this is chakra not a custom component*/}
        <FormLabel>Upload Your Photo</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="/img"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        marginTop="10px"
        onClick={SubmitHandler}
        isLoading={picLoading}
      >
        SignUp
      </Button>
    </VStack>
  );
}

export default SignUp;
