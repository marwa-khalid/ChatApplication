import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios"; // Import Axios

import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";

const ChatInterface = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchRecentUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      setLoggedInUser(user);
      const loggedInUserId = user.id;
      axios
        .get(
          `http://localhost:5000/api/users/specific?loggedInUserId=${loggedInUserId}`
        )
        .then((response) => {
          console.log(response.data);

          setRecentUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching recent users:", error);
        });
    };

    fetchRecentUsers();
  }, [refresh]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSearch = async (searchQuery) => {
    try {
      console.log(searchQuery);
      const loggedInUserId = loggedInUser.id;
      if (searchQuery) {
        const response = await axios.get(
          `http://localhost:5000/api/users/search?query=${searchQuery}&loggedInUserId=${loggedInUserId}`
        );
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <Flex height={"100vh"}>
      <Sidebar
        recentUsers={recentUsers}
        onUserSelect={handleUserSelect}
        onSearch={handleSearch}
        activeUserId={selectedUser?._id}
        searchResults={searchResults}
      />
      <ChatArea
        selectedUser={selectedUser}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Flex>
  );
};

export default ChatInterface;
