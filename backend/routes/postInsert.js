const express = require("express");

const {insert} = require("../config/db")

const router = express.Router();

// create a new student account
router.post("/new/post", async (req, res) => {
    const {title, labName, supervisor, location, startDate, description, responsibilities, requirements, tags, applyLink} = req.body;

    await insert({
        title: title,
        labName: labName,
        supervisor: supervisor,
        location: location,
        startDate: startDate,
        description: description,
        responsibilities: responsibilities,
        requirements: requirements,
        tags: tags,
        applyLink: applyLink,
    }, "posts");

    return res.status(200).json({
        message: "New post created!"
    })

});

module.exports = router;