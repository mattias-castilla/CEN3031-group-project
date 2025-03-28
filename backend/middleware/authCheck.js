const jwt = require("jsonwebtoken");

// need an actual jwt secret setup and need to remove this temp
const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";

const authCheck = (req, res, next) => {

    // using cookie for storing the token is the same process as using an authorization header
    // much easier and cleaner
    const token = req.cookies.token;

    // check if there is a token
    if(!token) {
        return res.status(401).json({message : "no token found"});
    }

    // verify the token
    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch (error){
        res.status(403).json({message: "invalid token"});
    }
};

module.exports = authCheck;