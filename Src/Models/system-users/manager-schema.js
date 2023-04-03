const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const ManagerSchema = new mongoose.Schema({

    manager_email: { type: String, required: true, unique: true },
    manager_pass: { type: String, required: true },
    manager_name: { type: String, required: true, },
    manager_image: { type: String },
    manager_mobile: {
        type: Number,
        unique: true,
        required: true,
        minlength: [10, "Mobile number must be of 10 digits"],
        maxlength: [10, "Mobile number must be of 10 digits"]
    },
    manager_address: { type: String, required: true },
    manager_skill: { type: String, required: true, },
    manager_study: { type: String, required: true, },
    manager_experience: { type: Number, required: true, min: 0 },
    loginTokens: [{ token: { type: String, } }],
},
    { timestamps: true }
);


ManagerSchema.methods.createToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.loginTokens.push({ token: token });
        return token;

    } catch (error) {
        throw (error);
    }
}

const ManagerCollection = mongoose.model("manager", ManagerSchema);
module.exports = ManagerCollection;