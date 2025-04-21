var express = require('express');
const authCheck = require('../middleware/authCheck');
const { insert, getPostings } = require('../config/db');
const researcherCheck = require('../middleware/researcherCheck');
const studentCheck = require('../middleware/studentCheck');
var router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test user api" });
});

router.get("/all/posts", authCheck, async (req, res) => {
  const posts = await getPostings();

  try {
    res.json({ posts });
  }catch(err){
    res.statusCode(500).json({
      message: "Server error!"
    });
  }
  
});

// post the researchers new research posting
router.post("/new/post", authCheck, researcherCheck, (req, res) => {
  const { email, title, department, tags, date, description } = req.body;

  try {

    insert({
      email,
      title,
      department,
      tags,
      date,
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


router.post("/apply", authCheck, studentCheck, (req, res) => {
  const {post, email, date, application} = req.body;

  try{

    insert({
      post,
      email,
      date,
      application
    }, "applications")
      .then(() => {
        res.status(201).json({ message: "Application created!" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Application failed!", details: err.message });
      });
  } catch (err) {
    res.status(500).json({ error: "Server error!", details: err.message });
  }

});

const { isStudent, isResearcher } = require('../config/db');
//const authCheck = require('../middleware/authCheck');

router.get('/role', authCheck, async (req, res) => {
  const email = req.user.email;
  if (await isStudent(email))    return res.json({ role: 'student' });
  if (await isResearcher(email)) return res.json({ role: 'researcher' });
  return res.status(404).json({ message: 'Role not found' });
});

module.exports = router;
