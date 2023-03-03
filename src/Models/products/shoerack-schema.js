const mongoose = require('mongoose');


const ShoerackSchema = new mongoose.Schema({

    shoerack_name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
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
    no_of_shelves: {
        type: Number,
        default: 2
    }
});

const ShoerackCollection = mongoose.model("shoerack", ShoerackSchema);
module.exports = ShoerackCollection;