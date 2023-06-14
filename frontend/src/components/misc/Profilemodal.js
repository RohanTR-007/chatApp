import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Lorem,
  Text,
  useDisclosure,
  Avatar,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const Profilemodal = ({user,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    {/* check if it has child or not if it doesn't have child then display eye ico else display child */}
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display={"flex"}
          alignItems="center"
          flexDirection={"column"}
        >
          <ModalHeader fontSize={"30px"} fontWeight="bold">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems="center"
            flexDirection={"column"}
          >
            <Image
              borderRadius={"full"}
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text fontWeight="bold" mt="1rem">
              Email : {user.email}
            </Text>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profilemodal;
