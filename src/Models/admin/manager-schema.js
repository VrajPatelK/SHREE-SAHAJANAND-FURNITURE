const mongoose = require('mongoose');

const ManagerShcema = new mongoose.Schema({

    manager_name: {
        type: String,
        required: true,
    },
    manager_email: {
        type: String,
        required: true,
        unique: true
    },
    manager_mobile: {
        type: Number,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    manager_img: {
        type: String,
    },
    manager_address: {
        type: String,
        required: true,
    },
    manager_study: {
        type: String
    },
    manager_experience: {
        type: Number,
        min: 0
    },
    manager_skill: {
        type:String
    },
    manager_pass: {
        type: String,
        required: true
    }
});

// Accoutant:-
// => name, email, mobile ,address, study background, experience

const ManagerCollection = mongoose.model("manager", ManagerShcema);
module.exports = ManagerCollection;