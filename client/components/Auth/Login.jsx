import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Avatar,
} from "@chakra-ui/react";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in:", { username, password });
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Registering:", { name, email, username, password });
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box width={"30%"} shadow={"2xl"} padding={10}>
        <Heading textAlign="center" mb={4}>
          <Flex justifyContent={"center"} gap={4}>
            <Avatar src="/logo.png" />
            <Text>ChitChat</Text>
          </Flex>
        </Heading>
        <Text textAlign="center" mb={8}>
          Welcome to ChitChat!
        </Text>
        {isLoginForm ? (
          <Flex flexDirection={"column"}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              mb={4}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
            <Flex justifyContent="center">
              <Button
                colorScheme="purple"
                bg={"#886cdb"}
                size="md"
                mb={4}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection={"column"}>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mb={4}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={4}
            />
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              mb={4}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
            <Flex justifyContent="center">
              <Button
                alignSelf={"center"}
                colorScheme="purple"
                bg={"#886cdb"}
                size="md"
                mb={4}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Flex>
          </Flex>
        )}
        <Text textAlign="center">
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            style={{ color: "#886cdb", cursor: "pointer" }}
            onClick={toggleForm}
          >
            {isLoginForm ? "Register" : "Login"}
          </span>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
