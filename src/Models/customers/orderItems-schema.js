const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({

    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType' },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
    quantity: { type: Number },
    totalBill: { type: Number, min: 1, required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    isReached: { type: Boolean, default: false }
});

const OrderItemCollection = mongoose.model("order-item", OrderItemSchema);
module.exports = OrderItemCollection;