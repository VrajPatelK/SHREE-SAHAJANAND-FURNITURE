const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    orderItems: [{
        orderItem: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'order-item' },
    }],
});

const OrderCollection = mongoose.model("order", OrderSchema);
module.exports = OrderCollection;