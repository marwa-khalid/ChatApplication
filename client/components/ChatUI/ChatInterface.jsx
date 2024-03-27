import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

const App = () => {
  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: "Hasnan",
      messages: ["Hi", "How are you"],
      responses: ["Hello", "I'm fine, thank you!"],
    },
    {
      id: 2,
      name: "Aesha",
      messages: ["Salam", "My Niggs"],
      responses: ["Waalaikum Assalam", "What's up?"],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSearch = (query) => {
    // Implement user search functionality
  };

  return (
    <Flex height={"100vh"}>
      <Sidebar
        recentUsers={recentUsers}
        onUserSelect={handleUserSelect}
        onSearch={handleSearch}
        activeUserId={selectedUser?.id}
      />
      <ChatArea selectedUser={selectedUser} />
    </Flex>
  );
};

export default App;
