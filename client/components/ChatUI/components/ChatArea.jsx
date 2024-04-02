import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Avatar, Text, Input, IconButton } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const ChatArea = ({ selectedUser, setRefresh, refresh }) => {
  const [messageText, setMessageText] = useState("");
  const loggedInUser =
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("user"));
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null); // Ref for chat container

  useEffect(() => {
    fetchChatHistory();

    // Polling interval: fetch messages every 5 seconds
    const interval = setInterval(fetchChatHistory, 5000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [selectedUser]);
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever chat history updates
  }, [chatHistory]);

  console.log(selectedUser);
  const fetchChatHistory = async () => {
    const senderId = loggedInUser.id;
    const receiverId = selectedUser.id;

    await axios
      .get(
        `http://localhost:5000/api/chats?senderId=${senderId}&receiverId=${receiverId}`
      )
      .then((response) => {
        console.log(response.data);

        setChatHistory(response.data.chat);
        setRefresh(!refresh);
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
        receiverId: selectedUser.id, // Assuming receiverId is required in your backend
        content: messageText,
      });
      fetchChatHistory();

      console.log("Message sent:", messageText);

      setMessageText(""); // Clear input after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timestamp) => {
    const messageTime = new Date(timestamp);
    let hours = messageTime.getHours();
    const minutes = messageTime.getMinutes().toString().padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${amOrPm}`;
  };

  return (
    <Box position="relative" height={"100vh"} bg="#f0f0f0" p={4} w="75%">
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
          <Box
            maxHeight="calc(100vh - 200px)" // Adjust the height as per your requirement
            overflowY="auto" // Enable vertical scrolling
          >
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
                  borderRadius="10"
                  bg={message.sender === loggedInUser.id ? "#886cdb" : "grey"}
                >
                  <Text color="white">
                    {message.content}{" "}
                    <Text fontSize={10} color="white">
                      {formatTime(message.timestamp)}
                    </Text>
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={chatContainerRef} /> {/* Empty div for scrolling */}
          </Box>

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
