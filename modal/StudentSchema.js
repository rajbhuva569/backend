const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({


    firstname: {
        type: String,

    },
    lastname: {
        type: String,

    },
    marks: {
        type: Number,
        // require: true
    },
    std: {
        type: String,
        // require: true
    },
    mobile_number: {
        type: Number,
        // require: true
    },
    imagename:{
        type:String
    },
    role: {
        type: String,
        default: 'user'

    },
    userId:{
        type:String
    }

})

const users = mongoose.model("student", studentSchema)

module.exports = users;