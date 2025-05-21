const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const { connectDB } = require("./config/database.js");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation.js");
const validator = require("validator");
const bcrypt = require("bcrypt");

app.use(express.json());

//Add userData to database
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error("Email is not valid!");
        }

        const userData = await User.findOne({emailId});
        if(!userData) {
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        res.status(201).send("Login Successful!!");
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
    }
})

//Get user by email
app.get("/user", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ emailId: email });
        res.send(user);
    } catch (error) {
        res.status(500).send("Error fetching data from database");
    }
});

//Get all the users
app.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find();
        if (allUsers.length === 0) {
            res.status(404).send("No Users Found");
        } else {
            res.send(allUsers);
        }
    } catch (error) {
        res.status(500).send("Error fetching data from database");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "about", "skills"];
        const isAllowedUpdate = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
        if (!isAllowedUpdate) {
            throw new Error("Update is no allowed");
        }

        const updatedData = await User.findByIdAndUpdate({ userId }, data, {
            returnDocument: "before",
        });
        console.log(updatedData);
        res.status(200).send("Updated User Data Successfully")

    } catch (error) {
        res.status(500).send("UPDATE FAILED: " + error.message);
    }
})

connectDB().then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch((error) => {
    console.log("Database Cannot Be Connected");
});
