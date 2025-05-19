require('dotenv').config();
const mongoose = require("mongoose");
const URL = `mongodb+srv://diksysingh:az0ova4ZCTNghYPH@devcluster.gkr1coh.mongodb.net/devTinder`

const connectDB = async () => {
    await mongoose.connect(URL);
};

module.exports = {
    connectDB
};