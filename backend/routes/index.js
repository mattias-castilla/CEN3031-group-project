var express = require('express');
var router = express.Router();

const usersRoutes = require("./users");

router.use("/users", usersRoutes);

module.exports = router;
