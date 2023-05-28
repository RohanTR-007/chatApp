import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
function Form(props) {
    const{label,handleChange}=props;
    // const label=props.label
    // const functionnn =props.handleChange
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input
        name={label}
        border={"1px"}
        placeholder={`enter your ${label}`}
        onChange={handleChange}
      />
    </FormControl>
  );
}



export default Form;
