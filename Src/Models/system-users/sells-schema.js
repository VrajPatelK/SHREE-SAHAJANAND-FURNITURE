const mongoose = require('mongoose');

const SellSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    order: { type: mongoose.Schema.Types.ObjectId, refPath: 'order' },
    totalBill: { type: Number, min: 1 },
    totalDiscount: { type: Number, min: 0 },
    sellDate: { type: Date },

}, { timestamps: true });

const SellCollection = mongoose.model("sell", SellSchema);
module.exports = SellCollection;