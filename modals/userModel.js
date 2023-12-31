const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kisanid:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // recent searches
}, {
    timeStamp: true
});


const User = mongoose.model("User", userModel);
module.exports = User;