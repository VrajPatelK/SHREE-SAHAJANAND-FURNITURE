const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
},
    { timestamps: true }
);

const CartCollection = mongoose.model("cart", CartSchema);
module.exports = CartCollection;