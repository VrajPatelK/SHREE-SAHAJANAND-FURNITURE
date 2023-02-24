const mongoose = require('mongoose');

const TvUnitsSchema = new mongoose.Schema({
    tvunit_name: {
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
        required: true
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    no_of_drawers: {
        type: String,
        default: 0
    }
});


const TvUnitCollection = mongoose.model("tvunit", TvUnitsSchema);
module.exports = TvUnitCollection;