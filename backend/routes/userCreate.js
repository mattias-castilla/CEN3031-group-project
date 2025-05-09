const express = require("express");
const bcrypt = require("bcryptjs");

const {validUser, insert} = require("../config/db")

const router = express.Router();

// create a new student account
router.post("/new/student", async (req, res) => {
    const {first_name, last_name, major, year, email, password} = req.body;

    const valid = await validUser(email);

    if(valid){
        return res.status(401).json({
            message: "An account already exists with that email!"
        });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await insert({
        first_name,
        last_name,
        major,
        year,
        role: "student",
        email: email,
        password: hashed_password
    }, "students");

    return res.status(200).json({
        message: "New student created!"
    })

});

// create a new researcher account
router.post("/new/researcher", async (req, res) => {
    const {first_name, last_name, affiliation, department, email, password} = req.body;

    const valid = await validUser(email);

    if(valid){
        return res.status(401).json({
            message: "An account already exists with that email!"
        });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await insert({
        first_name,
        last_name,
        affiliation,
        department,
        role: "researcher",
        email: email,
        password: hashed_password

    }, "researchers");

    return res.status(200).json({
        message: "New researcher created!"
    })

});

module.exports = router;