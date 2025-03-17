const jwt = require("jsonwebtoken");

// need an actual jwt secret setup and need to remove this temp
const JWT_SECRET = process.env.JWT_SECRET || "temp_secret";

const authCheck = (req, res, next) => {


    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({ message: "No authorization header"});
    }

    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message : "no token found"});
    }

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch (error){
        res.status(403).json({message: "invalid token"});
    }
};

module.exports = authCheck;