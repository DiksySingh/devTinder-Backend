const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Please enter a strong password");
            }
        }
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
        type: String,
        default: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"
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