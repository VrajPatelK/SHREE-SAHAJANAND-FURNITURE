const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    name: { type: String, },
    image: { type: String },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: [10, "Mobile number must be of 10 digits"],
        maxlength: [10, "Mobile number must be of 10 digits"]
    },
    homeNo: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: Number, minlength: 6, maxlength: 6, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    loginTokens: [{
        token: { type: String, unique: true }
    }],
},
    { timestamps: true }
);

CustomerSchema.methods.createToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.loginTokens.push({ token: token });
        return token;

    } catch (error) {
        return res.status(500).render("errorpage/error-page-500");
    }
}

mongoose.models = {}
const CustomerCollection = mongoose.model("customer", CustomerSchema);
module.exports = CustomerCollection;
