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
        throw new Error("FirstName should be 3-20 characters.");
    }

    if (lastName && !validator.isLength(lastName, { max: 20 })) {
        throw new Error("LastName should be a maximum of 20 characters.");
    }

    if (age && (age < 18)) {
        throw new Error("Age should be 18 or above.");
    }

    if (gender && !["Male", "Female", "Other"].includes(gender)) {
        throw new Error("Gender must be Male, Female, or Other.");
    }

    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Photo URL is not valid.");
    }

    if (about && !validator.isLength(about, { min: 10, max: 100 })) {
        throw new Error("About should be between 10 to 100 characters.");
    }

    if (skills && (!Array.isArray(skills) || skills.length > 10)) {
        throw new Error("Skills should be maximum of 10.");
    }
};

const validatePasswordUpdateData = (req) => {
        const loggedInUser = req.user;
        const {oldPassword, newPassword} = req.body;
        
        if (newPassword === oldPassword) {
            throw new Error("New password should not be same as old password");
        } else if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Please enter a strong new password");  
        }
};

module.exports = {
    validateSignUpData,
    validateProfileUpdateData,
    validatePasswordUpdateData
}