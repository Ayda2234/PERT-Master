import {
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  ChakraProvider,
  Heading,
  Textarea,
  Select,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [project_name, setProject_name] = useState("");
  const [description, setDescription] = useState("");
  const [project_type, stetProject_type] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Open the modal initially

  const toast = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const project_owner = user._id;

  const onSubmit = async () => {
    if (!(project_name && description && project_type && date)) {
      toast({
        title: "Veuillez remplir vos infornations ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(
        "/api/project",
        { project_name, description, project_owner, date, project_type },
        config
      );

      toast({
        title: "project created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("prijectInfo", JSON.stringify(data));
      navigate("/dashboard");
      onClose(); // Close the modal after successful submission
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "error create.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const { onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <FormControl>
      {/* <Button onClick={onOpen}>create project</Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setIsOpen(false);
        }}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          w={"50%"}
          h={"justifyContent"}
          borderRadius={"8px"}
          m={"4% 25%"}
        >
          <ChakraProvider>
            <ModalCloseButton
              w={"40px"}
              h={"40px"}
              marginLeft={"92%"}
              mt={"1%"}
            />
            <Heading textAlign={"center"} mt={"10"} fontSize="30px">
              Ajouter un project
            </Heading>

            <FormControl justifyContent={"center"} mt={"50px"}>
              <FormLabel w={"80%"} ml={"10%"}>
                name projet{" "}
              </FormLabel>
              <Input
                placeholder={"entre le nom du projet"}
                onChange={(e) => setProject_name(e.target.value)}
                id="project_name"
                type="project_name"
                w={"80%"}
                ml={"10%"}
              />
            </FormControl>

            <FormControl mt={"3%"}>
              <FormLabel w={"80%"} ml={"10%"}>
                description{" "}
              </FormLabel>

              <Textarea
                w={"80%"}
                ml={"10%"}
                id="discrip"
                placeholder="enter la description"
                onChange={(e) => setDescription(e.target.value)}
                type="description"
              />
            </FormControl>
            <FormControl mt={"3%"}>
              <FormLabel w={"80%"} ml={"10%"}>
                date
              </FormLabel>
              <Input
                w={"80%"}
                ml={"10%"}
                id="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select Date"
                size="md"
                type="date"
              />
            </FormControl>
            <FormControl mt={"3%"}>
              <FormLabel w={"80%"} ml={"10%"}>
                type de project
              </FormLabel>
              <Select
                type="progect_type"
                placeholder="choisissez le type de proget"
                w={"80%"}
                ml={"10%"}
                onChange={(e) => stetProject_type(e.target.value)}
              >
                <option value="PERT">PERT</option>
                <option value="GANTT">GANTT</option>
              </Select>
            </FormControl>
            <Button
              fontSize={"20px"}
              background={"#DDE7FA"}
              onClick={() => {
                onSubmit();
                onClose(); // to close the form once submitting
              }}
              color={"#263238"}
              borderRadius={"6px"}
              mt={"4%"}
              w={"50%"}
              ml={"25%"}
              mb={8}
            >
              Valider
            </Button>
          </ChakraProvider>
        </ModalContent>
      </Modal>
    </FormControl>
  );
}
