const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const { connectDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("Database Connected Successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
}).catch((error) => {
    console.log("Database Cannot Be Connected: " + error.message);
});
