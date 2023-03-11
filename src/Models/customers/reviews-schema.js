const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    reviews: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        msg: {
            type: String,
            required: true
        }
    }],
});

const ReviewCollection = mongoose.model("review", ReviewSchema);
module.exports = ReviewCollection;