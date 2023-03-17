const BedCollection = require("../../Src/Models/products/bed-schema");
const ChairCollection = require("../../Src/Models/products/chair-schema");
const JulaCollection = require("../../Src/Models/products/jula-schema");
const MattressesCollection = require("../../Src/Models/products/mattresses-schema");
const ShoerackCollection = require("../../Src/Models/products/shoerack-schema");
const ShowcaseCollection = require("../../Src/Models/products/showcase-schema");
const SofaCollection = require("../../Src/Models/products/sofa-schema");
const TableCollection = require("../../Src/Models/products/table-schema");
const TempaleCollection = require("../../Src/Models/products/tempale-schema");
const TvUnitCollection = require("../../Src/Models/products/tvunit-schema");
const WardrobeCollection = require("../../Src/Models/products/wardrobe-schema");

module.exports = {

    deleteProduct: async (req, res) => {
        try {
            let category = req.params.category;
            let target_id = req.params.pid;
            let result = null;

            if (target_id !== undefined) {

                if (category === 'bed') {
                    result = await BedCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'chair') {
                    result = await ChairCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'jula') {
                    result = await JulaCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'mattresse') {
                    result = await MattressesCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'shoerack') {
                    result = await ShoerackCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'showcase') {
                    result = await ShowcaseCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'sofa') {
                    result = await SofaCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'table') {
                    result = await TableCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'tempale') {
                    result = await TempaleCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'tvunit') {
                    result = await TvUnitCollection.deleteOne({ _id: target_id });
                }
                else if (category === 'wardrobe') {
                    result = await WardrobeCollection.deleteOne({ _id: target_id });
                }
                else {
                    return res.status(401).json({ error: true, em: "delete operation failed:)" });
                }
            }

            if (result === null)
                return res.status(401).json({ error: true, em: "delete operation failed, product is not found:)" });
            return res.status(301).redirect(`/product/${category}`);


        } catch (error) {
            console.log(error);
        }
    },

};