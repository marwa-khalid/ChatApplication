import React, { useState } from "react";
import { Box, Flex, Avatar, Text, Input, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatArea = ({ selectedUser }) => {
  const [messageText, setMessageText] = useState("");

  const handleMessageSend = () => {
    // Handle sending message logic here
    console.log("Sending message:", messageText);
    setMessageText(""); // Clear input after sending message
  };

  return (
    <Box height={"100vh"} bg="#f0f0f0" p={4} w="75%" overflowY="auto">
      {selectedUser && (
        <>
          <Flex shadow={"xl"} justifyContent="center" padding={1} mb={4}>
            <Avatar
              bg="#886cdb"
              color={"white"}
              name={selectedUser.name}
              size="md"
              mr={2}
            />
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              {selectedUser.name}
            </Text>
          </Flex>
          {selectedUser.messages.map((message, index) => (
            <Flex key={index} mb={4} alignItems="center">
              <Box padding={3} borderRadius="50" bg="grey">
                <Text color={"white"}>{message}</Text>
              </Box>
            </Flex>
          ))}
          {/* Display user's responses */}
          {selectedUser.responses.map((response, index) => (
            <Flex key={index} justifyContent="flex-end" mb={4}>
              <Box padding={3} borderRadius="50" bg="#886cdb">
                <Text color={"white"}>{response}</Text>
              </Box>
            </Flex>
          ))}
        </>
      )}
      {/* Message send input */}
      <Flex mt={"550px"} flexDirection="column" justifyContent="flex-end">
        <Flex alignItems="center">
          <Input
            padding={3}
            focusBorderColor="#886cdb"
            flex="1"
            variant="filled"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            mr={2}
          />
          <IconButton
            colorScheme="purple"
            bg="#886cdb"
            aria-label="Send"
            icon={<FaPaperPlane />}
            onClick={handleMessageSend}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatArea;
