const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    comments: {
        type: String
    }
});

const User = mongoose.model("User", userData);
module.exports = User;
