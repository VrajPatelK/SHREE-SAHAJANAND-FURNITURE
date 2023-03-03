const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    cartItems: [{
        cartItems: { typr: mongoose.Schema.Types.ObjectId, required: true, ref: "cart-item" }
    }],
});

const CartCollection = mongoose.model("cart", CartSchema);
module.exports = CartCollection;