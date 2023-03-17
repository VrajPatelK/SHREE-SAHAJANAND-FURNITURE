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
    getProduct: async (req, res) => {
        try {
            let category = req.params.category;
            let result = null;

            if (category === 'bed') {
                result = await BedCollection.find({});
            }
            else if (category === 'chair') {
                result = await ChairCollection.find({});
            }
            else if (category === 'jula') {
                result = await JulaCollection.find({});
            }
            else if (category === 'mattresse') {
                result = await MattressesCollection.find({});
            }
            else if (category === 'shoerack') {
                result = await ShoerackCollection.find({});
            }
            else if (category === 'showcase') {
                result = await ShowcaseCollection.find({});
            }
            else if (category === 'sofa') {
                result = await SofaCollection.find({});
            }
            else if (category === 'table') {
                result = await TableCollection.find({});
            }
            else if (category === 'tempale') {
                result = await TempaleCollection.find({});
            }
            else if (category === 'tvunit') {
                result = await TvUnitCollection.find({});
            }
            else if (category === 'wardrobe') {
                result = await WardrobeCollection.find({});
            }
            else {
                return res.status(401).json({ error: true, em: "page not found" });
            }

            res.locals.session.productType = category;
            res.status(200).render(`products/manage-${category}s`, { results: result });

        } catch (error) {
            console.log(error);
        }
    },
};