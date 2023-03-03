const mongoose = require('mongoose');

const GivesSchema = new mongoose.Schema({

    customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "onModels" },
    orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "order" },
    deliveryDate: { type: Date },
    isDelivered: { type: Boolean, default: false },
    onModels: {
        type: String,
        required: true,
        enum: [
            "bed", "chair", "jula", "mattresses", "shoerack",
            "showcase", "sofa", "table", "tempale", "tvunit", "wardrobe"
        ]
    }
});

const GivesCollection = mongoose.model("give", GivesSchema);
module.exports = GivesCollection;