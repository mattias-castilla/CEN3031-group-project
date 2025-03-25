const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
// need an actual jwt secret setup and need to remove this temp
const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";

// test login capabilities
/*
this is not how the actual user retrieval from the DB will work
doing it this way so that the test password is easily seen and 
understood for testing purposes
the actual function to grab user credentials from the DB will 
replace this
*/
const loginUserTest = async () => {

    const hashed_password = await bcrypt.hash("password", 10);

    return{
        email : "admin@gmail.com",
        password : hashed_password
    }
};


// simeple jwt test with the authenticaiton
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    // get stored user login
    /*
    ideally when the DB setup is complete this can be replaced 
    with a function that grabs the email from the DB
    and returns the users email and hashed password 
    this means everything else should work fine and the
    only thing changing is this function here
    */
    const stored_user = await loginUserTest();

    //check if email is valid
    if(email != stored_user.email){
        return res.status(401).json({
            message: "Invalid email!"
        });
    }

    //check if password is valid
    if(! (await bcrypt.compare(password, stored_user.password)) ){
        return res.status(401).json({
            message: "Invalid login!"
        });
    }

    const userToken = jwt.sign({email : stored_user.email }, JWT_SECRET, { expiresIn: "1h" });

    // the users jw token can be stored in a cookie
    // the cookie will be called token
    res.cookie("token", userToken, {
        httpOnly: true,
        secure: false, // since we are not using https the cookies can be sent over http
        maxAge: 3600000 // 1 hour in milliseconds
    })

    res.json({userToken, user: { email: stored_user.email } });
});

module.exports = router;