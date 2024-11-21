import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Heading,
  Flex,
  Text,
  IconButton,
  ChakraProvider,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EditProjectForm from "./Update";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  Button as AlertDialogButton,
} from "@chakra-ui/react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.js";
import Navbar from "../Components/Navbar.js";
import { Grid, GridItem } from "@chakra-ui/react";
import { MDBSpinner } from "mdb-react-ui-kit";
import TasksPage from "./tasks/index.js";
import { useProject } from "../context/ProjectContext.js";

export default function Project() {
  const { projectsContext, setProjectsContext } = useProject();
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [projectIdToEdit, setProjectIdToEdit] = useState(null);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const getProject = async () => {
    try {
      if (!user || !user.token) {
        navigate("/login");
        console.error("User or token is null.");
      }

      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const response = await axios.get("/api/project/", config);
      const allProjects = response.data.project;

      // Filter projects associated with the logged-in user
      const userProjects = allProjects.filter(
        (project) => project.project_owner === user._id
      );
      setProjectsContext(userProjects);
      setProjects(userProjects);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error fetching the projects.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getProject();
  }, [toast, user]);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();

  //delete the project

  const deleteProject = async (projectId) => {
    try {
      toast({
        title: "Project Deleted with Success.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/project/${projectId}`, config);

      const updated = projects.filter((project) => project._id !== projectId);
      setProjects(updated);
    } catch (error) {}
  };

  const editProject = async (projectId) => {
    try {
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
      toast({
        title: "Error fetching project details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleEditClick = (projectId) => {
    setProjectIdToEdit(projectId);
    setIsEditing(true);
  };

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);
  const deleteProjectWithConfirmation = (projectId) => {
    openAlert();
    setProjectIdToEdit(projectId);
  };

  const confirmDeleteProject = async () => {
    closeAlert();
    if (projectIdToEdit) {
      deleteProject(projectIdToEdit);
    }
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="#b8c8de" m={0}>
      <GridItem
        as="aside"
        colSpan="1"
        bg="#DDE7FA"
        minHeight="93vh"
        p="30px"
        borderRadius={20}
        mt={22}
        mb={28}
        ml={30}
        style={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values as needed
        }}
      >
        {user && <Sidebar user={user} />}
      </GridItem>
      <GridItem as="main" colSpan={5} bg="white" m="6" borderRadius={20}>
        <Navbar />
        {loading ? (
          <div className="d-flex justify-content-center">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        ) : (
          <>
            {projects.map((project) => (
              <Card
                key={project._id}
                boxShadow="none"
                mr={20}
                ml={20}
                bg="white"
                borderRadius="15px"
                //zIndex={1}
              >
                <CardBody
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="15px"
                  mb={4}
                  boxShadow="md"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="transform 0.3s ease-in-out"
                  style={{ borderLeft: "5px solid #263238" }}
                >
                  <Flex justify="space-between">
                    <Box>
                      <Link to={`/tasks/${project._id}`}>
                        <Heading size="md" textTransform="uppercase">
                          {project.project_name}
                        </Heading>
                      </Link>
                      <Text pt="2" fontSize="sm">
                        {project.description}
                      </Text>
                      <Text pt="1" fontSize="xs" color="gray.400">
                        {project.date}
                      </Text>
                    </Box>
                    <Menu placement="left-start">
                      <MenuButton
                        as={IconButton}
                        mt="15px"
                        pt="20px"
                        pb="20px"
                        pr="12px"
                        pl="12px"
                        icon={<FaEllipsisV boxSize={6} color="grey" />}
                        variant="outline"
                        size="sm"
                        aria-label="Edit"
                        mr={3}
                        border="none"
                        borderRadius="15px"
                        bg="#DDE7FA"
                      >
                        Project
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          color="#263238"
                          icon={<FaEdit />}
                          onClick={() => handleEditClick(project._id)}
                        >
                          Update
                        </MenuItem>
                        <MenuItem
                          color="#263238"
                          icon={<FaTrash />}
                          onClick={() =>
                            deleteProjectWithConfirmation(project._id)
                          }
                        >
                          Delete
                        </MenuItem>
                        <Link to={`/graph/${project._id}`}>
                          <Button>Show Gantt Chart</Button>
                        </Link>
                      </MenuList>
                    </Menu>
                  </Flex>
                </CardBody>
              </Card>
            ))}

            <AlertDialog
              isOpen={isAlertOpen}
              leastDestructiveRef={cancelRef}
              onClose={closeAlert}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Project
                  </AlertDialogHeader>
                  <Box p={5}>
                    Are you sure? You can't undo this action afterwards.
                  </Box>
                  <AlertDialogFooter>
                    <AlertDialogButton ref={cancelRef} onClick={closeAlert}>
                      Cancel
                    </AlertDialogButton>
                    <AlertDialogButton
                      colorScheme="red"
                      onClick={confirmDeleteProject}
                      ml={3}
                    >
                      Delete
                    </AlertDialogButton>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
        )}
        {isEditing && (
          <EditProjectForm
            projectId={projectIdToEdit}
            onClose={() => setIsEditing(false)}
            onUpdate={getProject} // Update the list after the editing project
          />
        )}
      </GridItem>
    </Grid>
  );
}
