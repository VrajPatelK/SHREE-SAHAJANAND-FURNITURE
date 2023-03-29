const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    msg: { type: String, required: true }
}, { timestamps: true }
);

const ContactCollection = mongoose.model("contact-us", ContactSchema);
module.exports = ContactCollection;