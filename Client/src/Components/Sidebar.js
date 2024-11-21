// Sidebar.js
import React from "react";
import {
  Flex,
  Box,
  VStack,
  Icon,
  Heading,
  Text,
  Image,
  Divider,
  Spacer,
  Button,
  Img,
} from "@chakra-ui/react";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import Logo from "../assets/images/logo2.png";
import { Link, useParams } from "react-router-dom";

const Sidebar = ({ user, pertTasks }) => {
  const { projectId } = useParams();
  return (
    <Flex>
      <Box
        as="aside"
        bg="##f4f4fa"
        w="200px"
        p={4}
        color="gray.500"
        boxShadow="md"
        borderRadius="50px"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justify="space-between"
          wrap="wrap"
          gap="5"
        ></Flex>
        <Flex>
          <Img
            zIndex={9999}
            position={"relative"}
            left={3}
            w={14}
            src={Logo}
            alt="website logo brand"
          />
          <Text mt={10}>ert Master</Text>
        </Flex>
        {/* <Divider color={'black'} bg='black' width={'100%'}></Divider> */}
        <Box align="stretch" mt={20}>
          <Link
            to={"/dashboard"}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              color: "black",
            }}
          >
            <Icon as={FaHome} fontSize="xl" mr={2} />
            Home
          </Link>
          {/* <Link
            to={`/pert/${projectId}`}
            state={{ pertTasks }}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              color: "black",
            }}
          >
            <Icon as={BiNetworkChart} fontSize="xl" mr={2} />
            Pert Chart
          </Link>
          <Link
            to={`/gant/${projectId}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              color: "black",
            }}
          >
            <Icon as={FaChartGantt} fontSize="xl" mr={2} />
            Gant Chart
          </Link> */}
          <Link
            to={"/profile"}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              color: "black",
            }}
          >
            <Icon as={FaUser} fontSize="xl" mr={2} />
            Profile
          </Link>
        </Box>
        <Box mb="30px">
          <Flex flexDirection="column" alignItems="center">
            <Image
              mt={250}
              borderRadius="30px"
              boxSize="100px"
              src={user.pic}
              alt=""
            />
            <Text
              mt="10px"
              textTransform="uppercase"
              fontFamily="poppins"
              fontSize="l"
              fontWeight="bold"
              color={"black"}
            >
              {user.name}
            </Text>

            <Text fontSize="m" color="grey">
              Project Manager
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
export default Sidebar;
