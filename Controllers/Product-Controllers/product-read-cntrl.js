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
            let pid = req.params.pid;
            let result = null;

            if (category === 'bed') {
                result = await BedCollection.find({ _id: pid });
            }
            else if (category === 'chair') {
                result = await ChairCollection.find({ _id: pid });
            }
            else if (category === 'jula') {
                result = await JulaCollection.find({ _id: pid });
            }
            else if (category === 'mattresse') {
                result = await MattressesCollection.find({ _id: pid });
            }
            else if (category === 'shoerack') {
                result = await ShoerackCollection.find({ _id: pid });
            }
            else if (category === 'showcase') {
                result = await ShowcaseCollection.find({ _id: pid });
            }
            else if (category === 'sofa') {
                result = await SofaCollection.find({ _id: pid });
            }
            else if (category === 'table') {
                result = await TableCollection.find({ _id: pid });
            }
            else if (category === 'tempale') {
                result = await TempaleCollection.find({ _id: pid });
            }
            else if (category === 'tvunit') {
                result = await TvUnitCollection.find({ _id: pid });
            }
            else if (category === 'wardrobe') {
                result = await WardrobeCollection.find({ _id: pid });
            }
            else {
                return res.status(401).json({ error: true, em: "page not found" });
            }

            res.locals.session.page = category;
            res.status(200).render(`products/manage-${category}s`, { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    getProductByFilter: async (req, res) => {
        try {
            let min = parseInt(req.body.f1[0]);
            let max = parseInt(req.body.f1[1]);
            let material = req.body.f2;
            let discount = parseInt(req.body.f3);
            let category = req.body.category;
            res.locals.session.page = category;

            let result = null;

            if (category === 'bed') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await BedCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await BedCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await BedCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await BedCollection.find({});
                }
            }
            else if (category === 'chair') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await ChairCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await ChairCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await ChairCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await ChairCollection.find({});
                }
            }
            else if (category === 'jula') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await JulaCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await JulaCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await JulaCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await JulaCollection.find({});
                }
            }
            else if (category === 'mattresse') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await MattressesCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await MattressesCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await MattressesCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await MattressesCollection.find({});
                }
            }
            else if (category === 'shoerack') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await ShoerackCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await ShoerackCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await ShoerackCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await ShoerackCollection.find({});
                }
            }
            else if (category === 'showcase') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await ShowcaseCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await ShowcaseCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await ShowcaseCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await ShowcaseCollection.find({});
                }
            }
            else if (category === 'sofa') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await SofaCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await SofaCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await SofaCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await ChairCollection.find({});
                }
            }
            else if (category === 'table') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await TableCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await TableCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await TableCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await TableCollection.find({});
                }
            }
            else if (category === 'tempale') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await TempaleCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await TempaleCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await TempaleCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await TempaleCollection.find({});
                }
            }
            else if (category === 'tvunit') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await TvUnitCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await TvUnitCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await TvUnitCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await TvUnitCollection.find({});
                }
            }
            else if (category === 'wardrobe') {
                if (min === -1 && max === -1 && discount > -1) {
                    result = await WardrobeCollection.find({
                        discount: { $lte: discount }
                    });
                }
                else if (min != -1 && max != -1 && discount === -1) {
                    result = await WardrobeCollection.find({
                        price: { $gte: min, $lte: max },
                    });
                }
                else if (min != -1 && max != -1 && discount > -1) {
                    result = await WardrobeCollection.find({
                        price: { $gte: min, $lte: max },
                        discount: { $lte: discount }
                    });
                } else { //(min === -1 && max === -1 && discount === -1)
                    result = await WardrobeCollection.find({});
                }
            }
            else if (category === 'all') {
                result = new Array();
                let tmp = new Array();

                tmp = await BedCollection.find({}); result = result.concat(tmp);
                tmp = await ChairCollection.find({}); result = result.concat(tmp);
                tmp = await JulaCollection.find({}); result = result.concat(tmp);
                tmp = await MattressesCollection.find({}); result = result.concat(tmp);
                tmp = await ShoerackCollection.find({}); result = result.concat(tmp);
                tmp = await ShowcaseCollection.find({}); result = result.concat(tmp);
                tmp = await SofaCollection.find({}); result = result.concat(tmp);
                tmp = await TableCollection.find({}); result = result.concat(tmp);
                tmp = await TempaleCollection.find({}); result = result.concat(tmp);
                tmp = await TvUnitCollection.find({}); result = result.concat(tmp);
                tmp = await WardrobeCollection.find({}); result = result.concat(tmp);
            }
            else {
                return res.status(401).json([{ error: true, em: "page not found" }]);
            }

            res.status(200).json(result);

        } catch (error) {
            console.log(error);
        }
    },
    displayProducts: async (req, res) => {
        try {
            res.status(200).render('products/manage-all');

        } catch (error) {
            console.log(error);
        }
    },
};
