const express = require("express");
const router = express.Router();
const User = require("../models/User");

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
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (user && password == user.password) {
      return res.send({
        message: "login Successful",
        user: { email: user.email, userName: user.userName },
      });
    }
  } catch (error) {
    console.error("error", error);
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
