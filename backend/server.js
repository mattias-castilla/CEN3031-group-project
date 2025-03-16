const express = require("express");
const { connectDB } = require("./config/db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});