const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    totalBill: { type: Number, min: 1 },
    totalDiscount: { type: Number, min: 0 },
    orderDate: { type: Date },
    isReached: { type: Boolean, default: false }

}, { timestamps: true });

const OrderCollection = mongoose.model("order", OrderSchema);
module.exports = OrderCollection;
