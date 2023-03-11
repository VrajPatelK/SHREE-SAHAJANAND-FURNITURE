const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    cartItems: [{
        cartItem: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'cart-item' },
    }],
},
    { timestamps: true }
);

const CartCollection = mongoose.model("cart", CartSchema);
module.exports = CartCollection;