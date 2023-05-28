import React from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} 
from "@chakra-ui/react";


function Passwordcomponent(props) {
  const { label, handleChange } = props;
  const [show, setshow] = useState(false);
  const handleShow = () => {
    setshow(!show);
  };
  return (
    <FormControl id={label} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? "txt" : "password"}
          placeholder={`Enter ${label}`}
          onChange={handleChange}
          name={label}
        />
        <InputRightElement>
          <Button h="1.5em" size="sm" onClick={handleShow} >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default Passwordcomponent;
