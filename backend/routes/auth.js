const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validUser, getPassword } = require("../config/db");

const router = express.Router();
// need an actual jwt secret setup and need to remove this temp
const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";

// return a cookie with successful login credentials
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    valid = await validUser(email)
    if(!valid){
        return res.status(401).json({
            message: "Invalid credentials!"
        });
    }

    const stored_password = await getPassword(email);

    //check if password is valid
    if(! (await bcrypt.compare(password, stored_password)) ){
        return res.status(401).json({
            message: "Invalid password!"
        });
    }

    const userToken = jwt.sign({email : email }, JWT_SECRET, { expiresIn: "1h" });

    // the users jw token can be stored in a cookie
    // the cookie will be called token
    res.cookie("token", userToken, {
        httpOnly: true,
        secure: false, // since we are not using https the cookies can be sent over http
        maxAge: 3600000 // 1 hour in milliseconds
    })

    res.json({userToken, user: { email: email } });
});

module.exports = router;