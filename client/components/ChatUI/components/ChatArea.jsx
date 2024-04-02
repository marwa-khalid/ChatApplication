import React, { useState, useEffect } from "react";
import { Box, Flex, Avatar, Text, Input, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const ChatArea = ({ selectedUser }) => {
  const [messageText, setMessageText] = useState("");
  const loggedInUser =
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("user"));
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetchChatHistory();
  }, [selectedUser]);

  const fetchChatHistory = async () => {
    const senderId = loggedInUser.id;
    const receiverId = selectedUser._id;

    await axios
      .get(
        `http://localhost:5000/api/chats?senderId=${senderId}&receiverId=${receiverId}`
      )
      .then((response) => {
        console.log(response.data);

        setChatHistory(response.data.chat);
      })
      .catch((error) => {
        console.error("Error fetching recent chats:", error);
      });
  };

  console.log(chatHistory);
  const handleMessageSend = async () => {
    try {
      // Make a POST request to send the message
      await axios.post("http://localhost:5000/api/chats", {
        senderId: loggedInUser.id, // Assuming senderId is required in your backend
        receiverId: selectedUser._id, // Assuming receiverId is required in your backend
        content: messageText,
      });
      fetchChatHistory();

      console.log("Message sent:", messageText);

      setMessageText(""); // Clear input after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      position="relative"
      height={"100vh"}
      bg="#f0f0f0"
      p={4}
      w="75%"
      overflowY="auto"
    >
      {selectedUser && (
        <>
          <Flex shadow={"xl"} justifyContent="center" padding={1} mb={4}>
            <Avatar
              bg="#886cdb"
              color={"white"}
              name={selectedUser.fullName}
              size="md"
              mr={2}
            />
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              {selectedUser.fullName}
            </Text>
          </Flex>
          {chatHistory.messages?.map((message, index) => (
            <Flex
              key={index}
              mb={4}
              alignItems="center"
              justifyContent={
                message.sender === loggedInUser.id ? "flex-end" : "flex-start"
              }
            >
              <Box
                padding={3}
                borderRadius="50"
                bg={message.sender === loggedInUser.id ? "#886cdb" : "grey"}
              >
                <Text color={"white"}>{message.content}</Text>
              </Box>
            </Flex>
          ))}

          <Flex
            flexDirection="column"
            justifyContent="flex-end"
            position="absolute" // Position the input absolutely
            bottom={0} // Align it at the bottom
            left={0}
            right={0}
            p={4}
            borderTop="1px solid #ccc"
          >
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
        </>
      )}
    </Box>
  );
};

export default ChatArea;
