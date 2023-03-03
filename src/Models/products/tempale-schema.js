const mongoose = require('mongoose');


const TempaleSchema = new mongoose.Schema({

    tempale_name: {
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
    no_of_drawers: {
        type: String,
        default: 2
    }
});

const TempaleCollection = mongoose.model("tempale", TempaleSchema);
module.exports = TempaleCollection;