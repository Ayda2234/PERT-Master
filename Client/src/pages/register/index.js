import {
  Box,
  Text,
  Button,
  Heading,
  Checkbox,
  Image,
  HStack,
  VStack,
  FormControl,
  Input,
  FormLabel,
  ChakraProvider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUP = () => {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast({
        title: "PLease Select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pert-master-app");
      data.append("cloud_name", "do7c6mjcd");
      fetch("https://api.cloudinary.com/v1_1/do7c6mjcd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "PLease Select Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const onSubmit = async () => {
    if (!(name && username && email && password && confirmPassword)) {
      toast({
        title: "Veuillez remplir vos infornations ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password.length > 6) {
      toast({
        title: "Le mot de passe doit contenir 6 caractères ou moins",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "le mot passe est incompatible",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email address",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = { headers: { "content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/user/",
        { name, username, email, password, pic },
        config
      );
      toast({
        title: "Account created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Username is already taken",
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } else if (error.response && error.response.status === 408) {
        toast({
          title: "Email is already taken",
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error connecting to the server",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDir="row"
      justifyContent="center"
      background="#ffffff"
    >
      <ChakraProvider>
        <VStack w="50%" h="100vh" pos="left">
          <Heading fontSize="40px" pb="0" mb="0" mt="5%">
            Create a new Account
            <Text fontSize="18px" color="#525252" ml="27px" mt="5px">
              Explore a new experiance in project management
            </Text>
          </Heading>
          <FormControl
            autoComplete="off"
            m="4% 20% 4% 20%"
            w="60%"
            h="60%"
            justifyContent="center"
          >
            <FormLabel htmlFor="username">Full Name</FormLabel>
            <Input
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="name"
              placeholder="name"
              w="100%"
              h="35px"
              borderRadius="5px"
              border="1px solid rgba(38, 50, 56, 0.50)"
            />

            <FormLabel htmlFor="username">username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="username"
              placeholder="username"
              w="100%"
              h="35px"
              borderRadius="5px"
              border="1px solid rgba(38, 50, 56, 0.50)"
            />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="mail@abc.com"
              w="100%"
              h="35px"
              borderRadius="5px"
              border="1px solid rgba(38, 50, 56, 0.50)"
            />

            <FormLabel htmlFor="password" mt="20px">
              Password
            </FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              w="100%"
              h="35px"
              required
              borderRadius="5px"
              border="1px solid rgba(38, 50, 56, 0.50)"
            />

            <FormLabel htmlFor="confirmPassword" mt="20px">
              Confirm Password
            </FormLabel>
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              type="password"
              name="password"
              placeholder="Confirm password"
              w="100%"
              h="35px"
              borderRadius="5px"
              border="1px solid rgba(38, 50, 56, 0.50)"
            />
            <FormLabel mt="20px">Upload Your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />

            <Button
              type="submit"
              mt="35px"
              fontSize="20px"
              background="#263238"
              color="#FFF"
              onClick={onSubmit}
              borderRadius="6px"
              w="100%"
              h="40px"
            >
              Sign up
            </Button>
            <HStack mt="5px" ml="80px">
              <Text color="#A1A1A1">Have an account?</Text>
              <Link
                to="/login"
                style={{ textDecoration: "underline", cursor: "pointer" }}
                color="#718096"
              >
                Go to login
              </Link>
            </HStack>
          </FormControl>
        </VStack>
      </ChakraProvider>
      <VStack background="blue" w="50%" h="100vh" pos="left">
        <Box boxSize="sm">
          <Image
            src={require("../../assets/images/signup.png").default}
            alt="Dan Abramov"
            w="100%"
            pt="100px"
          />
        </Box>
      </VStack>
    </Box>
  );
};
export default SignUP;
