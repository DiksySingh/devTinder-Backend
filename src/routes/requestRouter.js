const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
// Atul can send request to Dikshant -> status = "interested"
// Dikshant has already sent request to Atul -> status = "interested"
// Dikshant has ignored Atul i.e Atul cannot send request to Dikshant -> status = "ignored"
// Atul has already ignored Dikshant
// Dikshant has already accepted Atul request and vice versa
    try {
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error sending request: ${error.message}`
        });
    }
});
