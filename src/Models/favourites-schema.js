const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    products: {
        bed: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "bed" },
        chair: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "chair" },
        jula: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "jula" },
        mattresses: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "mattresses" },
        shoerack: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "shoerack" },
        showcase: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "showcase" },
        sofa: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "sofa" },
        table: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "table" },
        tempale: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "tempale" },
        tvunit: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "tvunit" },
        wardrobe: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "wardrobe" },
        other: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "other" },
    },
});


const FavouriteCollection = mongoose.model("favourite", FavouriteSchema);
module.exports = FavouriteCollection;