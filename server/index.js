const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();

const port = process.env.PORT || 5000;

const userRoute = require("./routes/users");
const chatRoute = require("./routes/chats");

const DB =
  "mongodb://marwakhalid:marwamarwa@marwa-shard-00-00.x9zjp.mongodb.net:27017,marwa-shard-00-01.x9zjp.mongodb.net:27017,marwa-shard-00-02.x9zjp.mongodb.net:27017/ChatApp?ssl=true&replicaSet=atlas-6szo5v-shard-0&authSource=admin&retryWrites=true&w=majority";

app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("connection successful with db");
  })
  .catch((err) => console.log("no connection"));

router.get("/", (req, res) => {
  res.send("Welcome to Chat App Server!");
});

app.use(express.json());
app.use("/", router);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);

app.listen(port, () => {
  console.log(`Server running at port numnber ${port}`);
});
