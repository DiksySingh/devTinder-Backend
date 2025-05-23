const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
// Atul can send request to Dikshant -> status = "interested"
// Dikshant has already sent request to Atul -> status = "interested"
    try {
        const loggedInUser = req.user;
        const {status, toUserId} = req.params;

        const ALLOWED_STATUS = ["ignored", "interested"];
        const isStatusValid = ALLOWED_STATUS.includes(status);
        if (!isStatusValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const isToUserIdValid = await User.findById(toUserId);
        if (!isToUserIdValid) {
           throw new Error("Invalid UserId");
        }

        // if(loggedInUser._id.toString() === req.params.toUserId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "You cannot send request to yourself"
        //     });
        // }
        
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {
                    fromUserId: loggedInUser._id,
                    toUserId: toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: loggedInUser._id
                }
            ]
        });
        if (existingConnectionRequest) {
            return res.status(400).json({
                success: false,
                message: `Cannot Send Connection Request.`,
            });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId: loggedInUser._id,
            toUserId: toUserId,
            status: status
        });
        const savedConnectionRequest = await connectionRequest.save();
        if (!savedConnectionRequest) {
            return res.status(400).json({
                success: false,
                message: "Error sending request"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Connection request sent successfully",
            data: connectionRequest
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error sending request: ${error.message}`
        });
    }
});

module.exports = router;