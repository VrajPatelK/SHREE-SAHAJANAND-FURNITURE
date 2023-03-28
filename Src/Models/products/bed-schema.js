const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ""
    },
    brand: {
        type: String,
        default: "Wood-Tag" //don't take from admin
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
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    storage: {
        type: Boolean,
        default: false
    },
    max_load: {
        type: Number,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    }
});

const BedCollection = mongoose.model("bed", BedSchema);
module.exports = BedCollection;