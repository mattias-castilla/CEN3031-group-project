const express = require("express");
const authCheck = require("../middleware/authCheck");

const router = express.Router();

// subsequent protected pages must use authCheck

// test protected route
router.get("/test", authCheck, (req, res) => {
    res.json({ message: "Access authorized", user: req.user });
});

module.exports = router;