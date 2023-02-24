const mongoose = require('mongoose');

const AdminLoginSchema = new mongoose.Schema({

    admin_creator: {
        type: String,
        unique: true
    },
    admins: [{
        admin_email: {
            type: String,
            required: true,
            unique: true
        },
        admin_name: {
            type: String,
            required: true,
        },
        admin_img: {
            type: String,
        },
    }],
    admin_pass: {
        type: String,
    },
});
