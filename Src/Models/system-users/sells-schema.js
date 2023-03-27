const mongoose = require("mongoose");

const SellSchema = new mongoose.Schema({

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    total_bill: {
        type: Number,
        min: 1,
        required: true
    },
},
    { timestamps: true }
);

const SellCollection = mongoose.model("sell", SellSchema);
module.exports = SellCollection;


