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
        minLength: [10, "Mobile number must be of 10 digits"],
        maxLength: [10, "Mobile number must be of 10 digits"]
    },

    customer_address: {
        type: String,
        minLength: [0, "Min. length must be 5 of an address"],
        maxLength: [60, "Max length must be 60 of an address"]
    },

    addToCart: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "onModels",
            required: true,
        },
        onModels: {
            type: String,
            required: true,
            enum: [
                "bed", "chair", "jula", "mattresses", "shoerack",
                "showcase", "sofa", "table", "tempale", "tvunit", "wardrobe"
            ]
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        },
        onDate: {
            type: Date,
            default: new Date(),
        }
    }],

    favourites: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "onModels",
            required: true,
        },
        onModels: {
            type: String,
            required: true,
            enum: [
                "bed", "chair", "jula", "mattresses", "shoerack",
                "showcase", "sofa", "table", "tempale", "tvunit", "wardrobe"
            ]
        },
    }],

    reviews: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "onModels",
            required: true,
        },
        onModels: {
            type: String,
            required: true,
            enum: [
                "bed", "chair", "jula", "mattresses", "shoerack",
                "showcase", "sofa", "table", "tempale", "tvunit", "wardrobe"
            ]
        },
        review: {
            type: String,
            required: true
        }
    }],

    myOrders: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "onModels",
            required: true,
        },
        onModels: {
            type: String,
            required: true,
            enum: [
                "bed", "chair", "jula", "mattresses", "shoerack",
                "showcase", "sofa", "table", "tempale", "tvunit", "wardrobe"
            ]
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        },
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

const CustomerCollection = mongoose.model("cutomer", CustomerSchema);
module.exports = CustomerCollection;