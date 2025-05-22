const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        //Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
        //Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });
        await user.save();
        res.status(201).send("User saved successfully");
    }
    catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error("Email is not valid!");
        }

        const userData = await User.findOne({emailId});
        if(!userData) {
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await userData.validatePassword(password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = await userData.getJWT();
        res.cookie("token", token);
        res.status(201).send("Login Successful!!");
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
});

router.post("/logout", async (req, res) => {
    try {
        // res.clearCookie("token");
        res.cookie("token", null, { expires: new Date(0) });
        res.status(201).send("Logout Successful!!");
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
});

module.exports = router;