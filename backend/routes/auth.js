const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
// need an actual jwt secret setup and need to remove this temp
const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";

// test login capabilities
const loginUserTest = {
    email : "admin@gmail.com",
    password : "password"
};


// simeple jwt test with the authenticaiton
router.post("/login", (req, res) => {
    const {email, password} = req.body;

    if(email !== loginUserTest.email || password != loginUserTest.password){
        return res.status(401).json({message : "invalid credentials"});
    }

    const userToken = jwt.sign({email : loginUserTest.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({userToken, user: { email: loginUserTest.email } });
});

module.exports = router;