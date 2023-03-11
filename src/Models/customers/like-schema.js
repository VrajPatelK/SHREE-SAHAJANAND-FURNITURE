const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType' },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
});


const LikeCollection = mongoose.model("cart-item", LikeSchema);
module.exports = LikeCollection;