const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileUpdateData, validatePasswordUpdateData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
});


router.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        validatePasswordUpdateData(req);
        const { oldPassword, newPassword } = req.body;
        const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error("Old password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = hashedPassword;
        await loggedInUser.save();
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error updating password: ${error.message}`
        });
    }
});

module.exports = router;
