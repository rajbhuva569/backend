const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/magesDB"); 

const singupSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // require: true
    },
    lastname: {
        type: String,
        // require: true
    },
    email: {
        type: String,
        // require: true
    },

    password: {
        type: String,
        // require: true
    },
    otp: {
        type: Number,
        default: 1241
        // require: true
    },
    role: {
        type: String,
        default: "user"
    }, balance: {
        type: Number,
        default: 500
    },
    referId: {
        type: Number,
    },
    userId: {
        type: String,
    },
    referrPersonId: {
        type: String,

    }


})

const user = new mongoose.model("user", singupSchema)
module.exports = user