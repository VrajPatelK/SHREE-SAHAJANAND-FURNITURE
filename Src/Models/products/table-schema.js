const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({

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
        default: "table"
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
    material: { // for dinning tables
        type: String,
        default: "wood"
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
        required: true
    }
});

const TableCollection = mongoose.model("table", TableSchema);
module.exports = TableCollection;