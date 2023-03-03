const mongoose = require('mongoose');

const MattressesSchema = new mongoose.Schema({

    mattresses_name: {
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
    material: {
        type: String
    }
});


const MattressesCollection = mongoose.model("mattresses", MattressesSchema);
module.exports = MattressesCollection;