const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({

    customer_email: {
        type: String,
        required: true,
        unique: true
    },

    customer_name: {
        type: String,
    },

    customer_image: {
        type: String
    },

    customer_mobile: {
        type: Number,
        minlength: [10, "Mobile number must be of 10 digits"],
        maxlength: [10, "Mobile number must be of 10 digits"]
    },

    customer_homeNo: {
        type: Number,
    },
    customer_street: {
        type: String,
    },
    customer_pincode: {
        type: Number,
        minlength: 6,
        maxlength: 6
    },
    customer_district: {
        type: String,
    },
    customer_state: {
        type: String,
    },

    loginTokens: [{
        token: {
            type: String,
            required: true,
            unique: true
        }
    }],
},
    {
        timestamps: true
    }
);

CustomerSchema.methods.createToken = async function () {
    try {
        let token = jwt.sign({ _id: this.customer_email }, process.env.SECRET_KEY);
        this.loginTokens.push({ token: token });
        return token;

    } catch (error) {
        res.status(401).send(error);
    }
}

const CustomerCollection = mongoose.model("customer", CustomerSchema);
module.exports = CustomerCollection;
