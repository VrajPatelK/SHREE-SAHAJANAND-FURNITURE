const mongoose = require('mongoose');

const SellItemSchema = new mongoose.Schema({

    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType' },
    sell: { type: mongoose.Schema.Types.ObjectId, refPath: 'sell' },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
    quantity: { type: Number },
});

const SellItemCollection = mongoose.model("sell-item", SellItemSchema);
module.exports = SellItemCollection;