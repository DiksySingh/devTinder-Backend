const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Gender Data Is Not Valid");
            }
        }
    },
    photoUrl: {
        type: String
    },
    about: {
        type: String,
        default: "Hey there! I am using DevTinder."
    },
    skills: {
        type: [String],
        validate(value) {
            if(value.length > 5) {
                throw new Error("Only 5 skills are allowed for a user")
            }
        }
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;