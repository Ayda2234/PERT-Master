import {
  Box,
  ChakraProvider,
  Flex,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Botton from "../../Components/TaskComponents/Button";
import TaskTable from "../../Components/TaskComponents/TaskTable";
import SearchBar from "../../Components/TaskComponents/SearchBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { MDBSpinner } from "mdb-react-ui-kit";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../context/ProjectContext";

const TasksPage = () => {
  const { projectId } = useParams();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) navigate("/login");
  }, [navigate]);

  const getProject = async () => {
    try {
      if (!user || !user.token) {
        console.error("User or token is null.");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(
        `http://localhost:4000/api/project/${projectId}`,
        config
      );
      const jsondata = response.data;
      setProjects(jsondata.project);
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

  }, [projectId]);

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
        {user && <Sidebar pertTasks={projects} user={user} />}
      </GridItem>
      <GridItem as="main" colSpan={5} bg="white" m="6" borderRadius={20}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <MDBSpinner role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        ) : (
          <ChakraProvider>
            <Flex h="100vh" justifyItems="center" alignItems="center">
              <Box
                bg="white"
                height="90vh"
                width="100%"
                m="30px"
                borderRadius="20px"
                overflow="auto"
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Flex
                  mt="50"
                  ml="4"
                  alignItems="center"
                  justify="space-between"
                  wrap="wrap"
                  gap="5"
                >
                  <Text fontSize="4xl" fontWeight="bold">
                    {projects.project_name}
                  </Text>
                  <Spacer />
                  <SearchBar />
                </Flex>

                <Flex
                  ml="4"
                  mt="35"
                  mb="20px"
                  alignItems="center"
                  justify="space-between"
                  wrap="wrap"
                  gap="5"
                >
                  <Text fontSize="xl">{projects.description}</Text>
                  <Spacer />
                  <Botton
                    user={user}
                    projectID={projects._id}
                    Tasksarray={projects.tasks}
                  />
                </Flex>
                <TaskTable projectData={projects} user={user} />
              </Box>
            </Flex>
          </ChakraProvider>
        )}
      </GridItem>
    </Grid>
  );
};

export default TasksPage;
