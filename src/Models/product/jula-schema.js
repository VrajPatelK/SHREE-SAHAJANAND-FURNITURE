const mongoose = require('mongoose');

const JulaSchema = new mongoose.Schema({

    jula_name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true
    },
    color: {
        type: Array,
        require: true
    },
    dimensions: {
        length: {
            type: String,
            required: true
        },
        width: {
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        }
    },
    availability: {
        type: Boolean,
        require: true,
        default: true
    },
    price: {
        type: Number,
        default: 0, //rupees
        require: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    seaters: {
        type: Number,
        default: 1
    },
    max_load: {
        type: Number,
        default: 200 // in kg - don't take from admin.
    }
});

const JulaCollection = mongoose.model("jula", JulaSchema);
module.exports = JulaCollection;