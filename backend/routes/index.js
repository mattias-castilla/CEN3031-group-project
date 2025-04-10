var express = require('express');
var router = express.Router();


const authRoutes = require("./auth");
const usersRoutes = require("./users");
const protectedRoutes = require("./protected");
const userCreate = require("./userCreate");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/protected", protectedRoutes);
router.use("/user", userCreate);

module.exports = router;
