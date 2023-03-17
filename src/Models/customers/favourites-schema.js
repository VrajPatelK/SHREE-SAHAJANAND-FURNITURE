const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "customer" },
    // likeItems: [{
    //     likeItem: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'like' },
    // }],
});


const FavouriteCollection = mongoose.model("favourite", FavouriteSchema);
module.exports = FavouriteCollection;