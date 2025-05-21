const jwt = require("jsonwebtoken");
const User = require("../models/user");
const isAdminAuthorized = (req, res, next) => {
    // Check if the user is an admin
    console.log("isAdminAuthorized middleware called");
    const token = "xyz";
    const isValidToken = token === "xyz"; // Simulating token validation
    if (!isValidToken) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    } else {
        next();
    }
};

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Invalid Token");
        }

        const decodedData = await jwt.verify(token, "DevTinder@143$Ani");
        const { _id } = decodedData;
        const userData = await User.findById(_id);
        if(!userData) {
            throw new Error("User not found");
        }
        req.user = userData;
        next();
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
};

module.exports = {
    isAdminAuthorized,
    userAuth
};