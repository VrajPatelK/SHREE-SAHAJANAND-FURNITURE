const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    purchase: [{
        purchaseId: { typr: mongoose.Schema.Types.ObjectId, required: true, ref: "purchase" }
    }],
    totalBill: { type: Number, min: 1, required: true },
    orderDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    isReached: { type: Boolean, default: false }
});

const OrderCollection = mongoose.model("order", OrderSchema);
module.exports = OrderCollection;