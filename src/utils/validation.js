const validator = require("validator");
const User = require("../models/user");
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("FirstName or LastName not found");
    } else if (firstName.length < 3 || firstName.length > 20) {
        throw new Error("FirstName should be 3-20 characters");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateProfileUpdateData = (req) => {
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const isAllowedUpdate = Object.keys(req.body).every(key => ALLOWED_UPDATES.includes(key));
    if (!isAllowedUpdate) {
        throw new Error("Update is not allowed");
    }
    const { firstName, lastName, age, gender, photoUrl, about, skills } = req.body;
    if (firstName && !validator.isLength(firstName, { min: 3, max: 20 })) {
        return res.status(400).json({
            success: false,
            message: "FirstName should be 3-20 characters"
        });
        // throw new Error("FirstName should be 3-20 characters");
    } else if (lastName && !validator.isLength(lastName, {max: 20})) {
        return res.status(400).json({
            success: false,
            message: "LastName should be of maximum 20 characters"
        });
    } else if (age && (age < 18)) {
        return res.status(400).json({
            success: false,
            message: "Age should be greater than 18"
        });
    } else if (!["Male", "Female", "Other"].includes(gender)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Gender"
        });
    } else if (!validator.isURL(photoUrl)) {
        return res.status(400).json({
            success: false,
            message: "Photo URL is not valid"
        });
    } else if (about && !validator.isLength(about, { min: 10, max: 100 })) {
        return res.status(400).json({
            success: false,
            message: "About should be 10-100 characters"
        });
    } else if (skills && !Array.isArray(skills) && skills.isLength(skills, { max: 10 })) {
        return res.status(400).json({
            success: false,
            message: "Maximum 10 skills are allowed"
        });
    }
};

module.exports = {
    validateSignUpData,
    validateProfileUpdateData
}