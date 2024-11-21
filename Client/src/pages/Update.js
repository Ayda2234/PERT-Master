// EditProjectForm.js
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  ModalCloseButton,
  Heading,
  ChakraProvider,
} from "@chakra-ui/react";
import axios from "axios";

const EditProjectForm = ({ projectId, onClose, onUpdate }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [project_name, setProject_name] = useState("");
  const [description, setDescription] = useState("");
  const [project_type, setProject_type] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const ProjectDetails = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.get(
          `http://localhost:4000/api/project/${projectId}`,
          config
        );
        const projectDetails = response.data;

        setProject_name(projectDetails.project_name);
        setDescription(projectDetails.description);
        setProject_type(projectDetails.project_type);
        setDate(projectDetails.date);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    ProjectDetails();
  }, []);

  const editProject = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      // Use the project ID or any unique identifier to construct the update URL
      const updateUrl = `http://localhost:4000/api/project/${projectId}`;

      // Implement your logic to update the project details based on the form inputs
      const updatedData = {
        project_name,
        description,
        project_type,
        date,
      };

      // Send a PUT request to update the project details
      await axios.put(updateUrl, updatedData, config);

      // Trigger the parent component to update the project list
      onUpdate();

      // Close the modal
      onClose();
    } catch (error) {
      // Handle error
      console.error("Error updating project:", error);
    }
  };

  return (
    <FormControl>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={onClose}
        motionPreset="slideInBottom"
        isTopMost={true}
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
        <ModalContent
          w={"30%"}
          h={"justifyContent"}
          borderRadius={"8px"}
          m={"4% 25%"}
          ml={530}
          bg={"white"}
        >
          <ChakraProvider>
            <ModalCloseButton
              w={"40px"}
              h={"40px"}
              marginLeft={"92%"}
              mt={"1%"}
              boxSize={25}
            />
            <Heading textAlign={"center"} mt={"10"} fontSize="30px">
              Editer un project
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
                onChange={(e) => setProject_type(e.target.value)}
              >
                <option value="PERT">PERT</option>
                <option value="GANTT">GANTT</option>
              </Select>
            </FormControl>
            <Button
              fontSize={"20px"}
              background={"#DDE7FA"}
              onClick={editProject}
              color={"#263238"}
              borderRadius={"6px"}
              mt={"4%"}
              w={"40%"}
              ml={"30%"}
              mb={8}
            >
              Valider
            </Button>
          </ChakraProvider>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

export default EditProjectForm;
