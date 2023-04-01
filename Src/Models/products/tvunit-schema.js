const mongoose = require('mongoose');

const TvUnitsSchema = new mongoose.Schema({
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
        default: "tvunit"
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
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
    warrenty: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_drawers: {
        type: Number,
        default: 0
    }
});


const TvUnitCollection = mongoose.model("tvunit", TvUnitsSchema);
module.exports = TvUnitCollection;