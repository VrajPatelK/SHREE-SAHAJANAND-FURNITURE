const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({

    email: { type: String, required: true },

}, { timestamps: true }
);

const SubscriberCollection = mongoose.model("subscriber", SubscriberSchema);
module.exports = SubscriberCollection;
