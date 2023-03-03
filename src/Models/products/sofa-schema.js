const mongoose = require('mongoose');


const SofaSchema = new mongoose.Schema({

    sofa_name: {
        type: String,
        require: true
    },
    img_link: {
        type: String,
        require: true,
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
    material: {
        type: String, //"Fabric - Solid Wood"
        require: true
    },
    seaters: {
        type: Number,
        default: 2 //seater
    },
    warrenty: {
        type: Number,
        default: 2 //years
    },
    discount: {
        type: Number,
        default: 0 //Exact disc.%
    },
    filler_type: {
        type: String,
        default: "Foam" //don't get input from admin - FIXED
    }
});

const SofaCollection = mongoose.model("sofa", SofaSchema);
module.exports = SofaCollection;
