var express = require('express');
const authCheck = require('../middleware/authCheck');
const { insert } = require('../config/db');
const researcherCheck = require('../middleware/researcherCheck');
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test user api" });
});

// post the researchers new research posting
router.post("/new/post", authCheck, researcherCheck, (req, res) => {
  const { email, title, department, description } = req.body;

  try {

    insert({
      email,
      title,
      department,
      description
    }, "posts")
      .then(() => {
        res.status(201).json({ message: "Post created!" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Post failed!", details: err.message });
      });
  } catch (err) {
    res.status(500).json({ error: "Server error!", details: err.message });
  }

});

module.exports = router;
