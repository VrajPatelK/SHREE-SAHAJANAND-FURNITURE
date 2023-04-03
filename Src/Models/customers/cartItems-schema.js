const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, refPath: 'productType' },
    cart: { type: mongoose.Schema.Types.ObjectId, refPath: 'cart' },
    productType: {
        type: String,
        enum: ['bed', 'chair', 'jula', 'mattresses', 'shoerack', 'showcase', 'sofa', 'table', 'tempale', 'tvunit', 'wardrobe', 'other'],
        required: true
    },
    quantity: { type: Number }
});


const CartItemCollection = mongoose.model("cart-item", CartItemSchema);
module.exports = CartItemCollection; 