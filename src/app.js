const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const { connectDB } = require("./config/database.js");
const User = require("./models/user");

app.use(express.json());   //
app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Dikshant",
        lastName: "Singh",
        emailId: "dikshant@singh.com",
        password: "dikshant@123"
    }
    //Creating a new instance of the User model
    try {
        const user = new User(userObj);
        await user.save();
        res.send("User saved successfully");
    }
    catch (error) {
        res.status(500).send("Error saving data to database");
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
