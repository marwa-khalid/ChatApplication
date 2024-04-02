import React from "react";
import { Box, Input, Text, useColorMode } from "@chakra-ui/react";

const Sidebar = ({
  recentUsers,
  searchResults,
  onUserSelect,
  onSearch,
  activeUserId,
}) => {
  console.log(recentUsers);
  console.log(activeUserId);
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      p={4}
      w="25%"
      borderRadius="md"
    >
      <Text mb={4} fontSize="xl" fontWeight="bold">
        All Chats
      </Text>

      <Input
        placeholder="Search users..."
        onChange={(e) => onSearch(e.target.value)}
        mb={4}
      />

      {(searchResults.length > 0 ? searchResults : recentUsers).map(
        (user, index) => (
          <Box
            key={index}
            onClick={() => onUserSelect(user)}
            cursor="pointer"
            mb={2}
            bg={activeUserId === user._id ? "#886cdb" : "transparent"}
            color={activeUserId === user._id ? "white" : "black"}
            borderRadius="md"
            p={2}
            // _hover={{
            //   bg: activeUserId !== user.id ? "#e5e5e5" : "#886cdb",
            //   color: activeUserId !== user.id ? "black" : "white",
            // }}
          >
            <Text fontWeight={activeUserId === user._id ? "bold" : "normal"}>
              {user.fullName}
            </Text>
            <Text
              color={activeUserId === user._id ? "white" : "grey"}
              fontSize="sm"
            >
              {user.responses?.length > 0
                ? user.responses[user.responses.length - 1]
                : user.latestMessage?.content
                ? user.latestMessage.content
                : "No messages"}
            </Text>
          </Box>
        )
      )}
    </Box>
  );
};

export default Sidebar;
