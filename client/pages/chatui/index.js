import ChatInterface from "@/components/ChatUI/ChatInterface";
import { ChakraProvider } from "@chakra-ui/react";

const index = () => {
  return (
    <ChakraProvider>
      <ChatInterface />
    </ChakraProvider>
  );
};

export default index;
