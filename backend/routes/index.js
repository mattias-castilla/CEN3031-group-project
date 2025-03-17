var express = require('express');
var router = express.Router();


const authRoutes = require("./auth");
const usersRoutes = require("./users");
const protectedRoutes = require("./protected");

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/protected", protectedRoutes);

module.exports = router;
