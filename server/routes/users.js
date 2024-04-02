const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Chat = require("../models/Chat");
router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, userName } = req.body;
    const SignupDetails = new User({
      email: email,
      password: password,
      fullName: fullName,
      userName: userName,
    });
    const user = await User.findOne({ email });
    if (user && email == user.email) {
      res.status(400).json({ message: "User with this email exists" });
    } else if (user && userName == user.userName) {
      res.status(400).json({ message: "User with this username exists" });
    }
    await SignupDetails.save();
    res.status(201).json({ message: "request sent successfully." });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ userName });
    console.log(user);
    if (user && password == user.password) {
      res.status(200).json({
        message: "login Successful",
        user: { email: user.email, userName: user.userName, id: user._id },
      });
    }
  } catch (error) {
    console.error("error", error);
  }
});
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/specific", async (req, res) => {
  try {
    // Assuming you have some way to retrieve the logged-in user's ID
    const { loggedInUserId } = req.query; // Adjust this according to your authentication setup

    // Find chats where the logged-in user is a participant
    const chats = await Chat.find({ participants: loggedInUserId }).populate(
      "participants",
      "fullName"
    ); // Populate participant details

    // Prepare the result array
    const result = [];

    // Iterate through each chat
    for (const chat of chats) {
      // Find the participants (excluding the logged-in user)
      const otherParticipant = chat.participants.find(
        (participant) => participant._id !== loggedInUserId
      );

      // Get the latest message
      const latestMessage = chat.messages[chat.messages.length - 1];

      // Construct the chat object with required data
      const chatData = {
        _id: chat._id,
        fullName: otherParticipant.fullName, // Assuming fullName is the name field you want
        latestMessage: {
          sender: latestMessage.sender,
          content: latestMessage.content,
          timestamp: latestMessage.timestamp,
        },
      };

      // Add the chat object to the result array
      result.push(chatData);
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    // Find users whose name matches the query (case-insensitive)
    const users = await User.find({
      fullName: { $regex: new RegExp(query, "i") },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
