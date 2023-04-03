const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType', required: true },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
});

const ReviewCollection = mongoose.model("review", ReviewSchema);
module.exports = ReviewCollection;