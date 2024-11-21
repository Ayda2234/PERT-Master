import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Flex,
  Spacer,
  AlertDialogFooter,
  Alert,
  AlertIcon,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import TaskForm from "./TaskForm";

const Botton = ({ projectID, Tasksarray, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTask = async (values, actions) => {
    try {
      if (user && user.token) {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const taskData = {
          task_name: values.name,
          description: values.description,
          date_start: values.date_start,
          duration: parseInt(values.duration),
          date_end: values.date_end,
        };

        const dataToSend = {
          projectId: projectID,
          taskData: taskData,
        };

        await axios.put("/api/project/add", dataToSend, config);

        setSuccessMessage("Tache ajouté!");
        setErrorMessage("");
        actions.resetForm();
      } else {
        setErrorMessage("No user data or token available");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Axios error:", error);
      setErrorMessage("Erreur lors de l'ajout du tache");
      setSuccessMessage("");
    }
  };

  return (
    <Box alignContent="center">
      <Flex justify="space-evenly">
        <Spacer />
        <Button
          mr="10"
          color="white"
          bg="black"
          _hover={{ bg: "gray.500" }}
          onClick={onOpen}
        >
          Add
        </Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add Task
              <AlertDialogCloseButton />
            </AlertDialogHeader>
            <TaskForm handleSubmit={addTask} TasksArray={Tasksarray} />
            <AlertDialogFooter>
              {successMessage && (
                <Alert status="success" mt={4}>
                  <AlertIcon />
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Botton;
