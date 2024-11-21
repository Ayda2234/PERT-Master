import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Spacer,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import CreateProject from "./formes/CreateProject";

const SearchResults = ({ results, searchTerm }) => (
  <Box
    position="absolute"
    top="100%"
    left="5"
    width="calc(30% - 2rem)"
    bg="white"
    boxShadow="md"
    borderRadius="md"
    mt="2"
    ml="345px"
    mr="150px"
    zIndex={1}
  >
    {results.map((result, i) => (
      <Box key={i} p="2" borderBottom="1px solid #ccc" textAlign="center">
        {result.project_name}
      </Box>
    ))}
  </Box>
);

export default function Navbar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateProject, setShowCreateProject] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleCreateProjectClick = () => {
    setShowCreateProject(true);
  };

  const fetchData = async () => {
    try {
      if (!user || !user.token) {
        console.error("User or token is null.");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get("/api/project/", config);
      const { data } = response;
      setData(data.project);
      setFilterData(data.project);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilter = (value) => {
    const response = filteredData.filter((f) =>
      f.project_name.toLowerCase().includes(value.toLowerCase())
    );
    setData(response);
    setSearchTerm(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider>
      <Flex
        as="nav"
        mt="50px"
        mb="40px"
        alignItems="center"
        position="relative"
      >
        <Heading as="h5" pl={20} pr={10} ml={10} fontSize={40}>
          {" "}
          Projets{" "}
        </Heading>

        <InputGroup ml="70px" mr="150px" bg="#DDE7FA" borderRadius="40px">
          <Input
            borderRadius="40px"
            p={7}
            pr="4.5rem"
            type="text"
            fontSize="18px"
            placeholder="cherche ici"
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          />
          <InputRightElement width="4.5rem" mt="9px">
            <SearchIcon color="gray.500" />
          </InputRightElement>
        </InputGroup>
        {searchTerm && <SearchResults results={data} searchTerm={searchTerm} />}
        <Spacer />

        <HStack spacing="20px">
          <Button
            bg="#263238"
            mr="120px"
            p={7}
            color="white"
            borderRadius="15px"
            _hover={{ bg: "#DDE7FA", color: "#263238" }}
            fontSize="18px"
            onClick={handleCreateProjectClick}
          >
            Create project
          </Button>

          {showCreateProject ? (
            <CreateProject
              user={user}
              onClose={() => setShowCreateProject(false)}
            />
          ) : (
            <></>
          )}
        </HStack>
      </Flex>
    </ChakraProvider>
  );
}
