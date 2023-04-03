const mongoose = require('mongoose');

const WardrobeSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "wardrobe"
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
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
    no_of_cupboards: {
        type: Number,
        default: 1
    },
    no_of_drawers: {
        type: Number,
        default: 1
    }
});

const WardrobeCollection = mongoose.model("wardrobe", WardrobeSchema);
module.exports = WardrobeCollection;