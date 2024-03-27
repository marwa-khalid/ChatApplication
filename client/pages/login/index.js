import Login from "@/components/Auth/Login";
import { ChakraProvider } from "@chakra-ui/react";

const index = () => {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
};

export default index;
