const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Design Service running" });
});

app.get("/api/designs", (req, res) => {
  res.json([]);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Design Service running on port ${PORT}`);
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});