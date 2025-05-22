const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "{VALUE} is not a valid status",
        }
    }

}, {
    timestamps: true,
});
const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;