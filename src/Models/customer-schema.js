const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({

    customer_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
                return (validator.isEmail(email));
            },
            message: "server : Invalid E-mail !!!"
        }
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
        type: Number,
        minlength: 6,
        maxlength: 6
    },
    customer_state: {
        type: Number,
        minlength: 6,
        maxlength: 6
    },

    favourites: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    }],

    myOrders: [{
        peoducts: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
            },
        }],
        total_bill: {
            type: Number,
            min: 1,
            required: true
        },
        onDate: {
            type: Date,
            default: new Date(),
        }
    }],
    orderHistory: [{
        peoducts: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
            },
        }],
        total_bill: {
            type: Number,
            min: 1,
            required: true
        },
        onDate: {
            type: Date,
            default: new Date(),
        }
    }],
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