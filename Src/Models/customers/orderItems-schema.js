const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({

    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType' },
    order: { type: mongoose.Schema.Types.ObjectId, refPath: 'order' },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
    quantity: { type: Number },
});

const OrderItemCollection = mongoose.model("order-item", OrderItemSchema);
module.exports = OrderItemCollection;