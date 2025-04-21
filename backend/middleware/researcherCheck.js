const { isResearcher } = require("../config/db");

// check if the user is a researcher
const researcherCheck = async (req, res, next) => {
    const email = req.user?.email;

    if(!email){
        return res.status(400).json({
            message: "Invalid token"
        });
    }

    const valid = await isResearcher(email);

    if(valid){
        next();
    }else{
        return res.status(403).json({
            message: "Not a researcher!"
        });
    }
};

module.exports = researcherCheck;