const express = require("express");
require('dotenv').config();
const { connectDB } = require("./config/db");
const path = require("path");
// the cookie parser must go here. not entirely sure why but it seems to work
// i am assuming the cookie parser must globally be used by express to work with other parts
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

connectDB(); // mongoDB init

// handle api request can be setup like this
const routes = require("./routes/index");
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../frontend/build")));


// catch all request to index.js
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});