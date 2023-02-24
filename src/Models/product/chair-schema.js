const mongoose = require('mongoose');

const ChairSchema = new mongoose.Schema({

    chair_name: {
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
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    max_load: {
        type: Number,
        require: true
    },
    backrest_type: {
        type: Boolean,
        default: false // = (true)? display(Adjutable) : display(Not-Adjutable);
    },
    hasWheels: {
        type: Boolean,
        default: false
    }
});

const ChairCollection = mongoose.model("chair", ChairSchema);
module.exports = ChairCollection;