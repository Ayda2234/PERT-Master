import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import TaskForm from "./TaskForm";

const ActionButton = ({ taskID, projectID, Tasksarray, user }) => {
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const cancelRef = React.useRef();
  const [options, setOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOptionsClick = () => {
    setOptions(!options);
  };

  const openUpdateDialog = () => {
    setUpdateOpen(true);
  };

  const closeUpdateDialog = () => {
    setUpdateOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const updateTask = async (values, actions) => {
    try {
      if (user && user.token) {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const taskData = {
          task_name: values.name,
          description: values.description,
          date_start: values.date_start,
          duration: parseInt(values.duration),
          date_end: values.date_end,
          parent: values.predecesseur,
        };
        console.log(taskData);
        console.log(values.predecesseur);

        const dataToSend = {
          projectId: projectID,
          taskId: taskID,
          updatedTaskData: taskData,
        };

        await axios.put("/api/project/edit", dataToSend, config);

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
  const deleteTask = async (actions) => {
    try {
      if (user && user.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const dataToSend = {
          projectId: projectID,
          taskId: taskID,
        };

        await axios.put("/api/project/delete", dataToSend, config);
        closeDeleteDialog();
      } else {
        console.error("No user data or token available");
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  return (
    <div>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaEllipsisV />}
          boxSize={8}
          onClick={handleOptionsClick}
        />
        {options && (
          <MenuList>
            <MenuItem icon={<FaEdit />} onClick={openUpdateDialog}>
              Update
            </MenuItem>
            <MenuItem color="red" icon={<FaTrash />} onClick={openDeleteDialog}>
              Delete
            </MenuItem>
          </MenuList>
        )}
      </Menu>
      <AlertDialog
        isOpen={isUpdateOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeUpdateDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Task
              <AlertDialogCloseButton />
            </AlertDialogHeader>
            <TaskForm handleSubmit={updateTask} TasksArray={Tasksarray} />
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

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Supprimer tache
            </AlertDialogHeader>
            <AlertDialogBody>
              Es ce que vous êtes sûr de supprimer cette tâche?.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={deleteTask} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default ActionButton;
