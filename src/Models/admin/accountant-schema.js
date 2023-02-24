const mongoose = require('mongoose');

const AccountantShcema = new mongoose.Schema({

    accountant_name: {
        type: String,
        required: true,
    },
    accountant_email: {
        type: String,
        required: true,
        unique: true
    },
    accountant_mobile: {
        type: Number,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    accountant_img: {
        type: String,
    },
    accountant_address: {
        type: String,
        required: true,
    },
    accountant_study: {
        type: String
    },
    accountant_experience: {
        type: Number,
        min: 0
    },
    accountant_pass: {
        type: String,
        required: true
    }
});

// Accoutant:-
// => name, email, mobile ,address, study background, experience

const AccountantCollection = mongoose.model("accountant", AccountantShcema);
module.exports = AccountantCollection;