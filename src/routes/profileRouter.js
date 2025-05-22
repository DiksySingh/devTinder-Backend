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
        const {firstName, lastName, age, gender, photoUrl, about, skills} = req.body;
        if (!validator.isLength(firstName, { min: 3, max: 20 })) {
            return res.status(400).json({
                success: false,
                message: "FirstName should be 3-20 characters"
            });
            // throw new Error("FirstName should be 3-20 characters");
        }

        if (age && (age < 18)) {
            return res.status(400).json({
                success: false,
                message: "Age should be greater than 18"
            });
        }

        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Gender"
            });
        }

        if(!validator.isURL(photoUrl)) {
            return res.status(400).json({
                success: false,
                message: "Photo URL is not valid"
            });
        }

        if (about && !validator.isLength(about, { min: 10, max: 100 })) {
            return res.status(400).json({
                success: false,
                message: "About should be 10-100 characters"
            });
        }

        if (skills && !Array.isArray(skills) && skills.isLength(skills, { max: 10 })) {
            return res.status(400).json({
                success: false,
                message: "Maximum 10 skills are allowed"
            });
        }
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
