const validator = require("validator");
const User = require("../models/user");
const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("FirstName or LastName not found");
    }else if (firstName.length < 3 || firstName.length > 20) {
        throw new Error("FirstName should be 3-20 characters");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    } 
};

module.exports = {
    validateSignUpData,
}