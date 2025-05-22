const express = require("express");
const router = express.Router();
const {userAuth} = require("../middleware/auth");
const {validateProfileUpdateData} = require("../utils/validation");

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // res.status(201).send(user);
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user
        });
    } catch (error) {
        // res.status(500).send("ERROR : " + error.message);
        return res.status(500).json({
            success: false,
            message: `Error fetching profile: ${error.message}`
        }); 
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        validateProfileUpdateData(req);
        const user = req.user;
        
        const userUpdatedData = Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });                 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error updating profile: ${error.message}`
        });
    }
})
