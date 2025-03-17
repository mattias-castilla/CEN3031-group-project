var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test user api" });
});

module.exports = router;
