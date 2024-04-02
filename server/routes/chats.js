const Chat = require("../models/Chat");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    // Find the chat document based on participants
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      // If no chat document exists, create a new one
      chat = new Chat({
        participants: [senderId, receiverId],
        messages: [{ sender: senderId, content }],
      });
    } else {
      // If a chat document exists, push the new message to the messages array
      chat.messages.push({ sender: senderId, content });
    }

    // Save the chat document
    await chat.save();

    return res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    console.log(senderId);
    console.log(receiverId);

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }
    return res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
