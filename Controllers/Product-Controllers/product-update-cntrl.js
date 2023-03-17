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

    updateProductGet: async (req, res) => {
        try {
            let category = req.params.category;
            let target_id = req.params.pid;
            let result = null;

            if (target_id !== undefined) {

                if (category === 'bed') {
                    result = await BedCollection.findOne({ _id: target_id });
                }
                else if (category === 'chair') {
                    result = await ChairCollection.findOne({ _id: target_id });
                }
                else if (category === 'jula') {
                    result = await JulaCollection.findOne({ _id: target_id });
                }
                else if (category === 'mattresse') {
                    result = await MattressesCollection.findOne({ _id: target_id });
                }
                else if (category === 'shoerack') {
                    result = await ShoerackCollection.findOne({ _id: target_id });
                }
                else if (category === 'showcase') {
                    result = await ShowcaseCollection.findOne({ _id: target_id });
                }
                else if (category === 'sofa') {
                    result = await SofaCollection.findOne({ _id: target_id });
                }
                else if (category === 'table') {
                    result = await TableCollection.findOne({ _id: target_id });
                }
                else if (category === 'tempale') {
                    result = await TempaleCollection.findOne({ _id: target_id });
                }
                else if (category === 'tvunit') {
                    result = await TvUnitCollection.findOne({ _id: target_id });
                }
                else if (category === 'wardrobe') {
                    result = await WardrobeCollection.findOne({ _id: target_id });
                }
                else {
                    return res.status(401).json({ error: true, em: "edit operation failed:)" });
                }
            }

            if (result === null)
                return res.status(401).json({ error: true, em: "edit operation failed, product is not found:)" });
            return res.status(201).render(`products/edit-${category}`, { result: result });

        } catch (error) {
            console.log(error);
        }
    },

    updateBedPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const storage = (req.body.update_storage === "on") ? true : false;

            updated_data = {
                bed_name: req.body.update_bed_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                warrenty: req.body.update_warrenty,
                discount: req.body.update_discount,
                max_load: req.body.update_max_load,
                storage: storage,
                capacity: req.body.update_capacity
            };

            await BedCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/bed");

        } catch (error) {
            console.log(error);
        }
    },

    updateChairPost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const backrest_type = (req.body.update_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.update_hasWheels === "on") ? true : false;

            updated_data = {
                chair_name: req.body.update_chair_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                discount: req.body.update_discount,
                max_load: req.body.update_max_load,
                backrest_type: backrest_type,
                hasWheels: hasWheels
            };

            await ChairCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/chair");

        } catch (error) {
            console.log(error);
        }
    },

    updateJulaPost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                jula_name: req.body.update_jula_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                seaters: req.body.update_seaters,
                max_load: req.body.update_max_load
            };

            await JulaCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/jula");

        } catch (error) {
            console.log(error);
        }
    },

    updateMattressesPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                mattresses_name: req.body.update_mattresses_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                discount: req.body.update_discount
            };

            await MattressesCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/mattresse");

        } catch (error) {
            console.log(error);
        }
    },

    updateShoerackPost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                shoerack_name: req.body.update_shoerack_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_shelves: req.body.update_no_of_shelves
            };

            await ShoerackCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/shoerack");

        } catch (error) {
            console.log(error);
        }
    },

    updateShowcasePost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                showcase_name: req.body.update_showcase_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_cupboards: req.body.update_no_of_cupboards
            };

            await ShowcaseCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/showcase");

        } catch (error) {
            console.log(error);
        }
    },

    updateSofaPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                sofa_name: req.body.update_sofa_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                seaters: req.body.update_seaters,
                warrenty: req.body.update_warrenty,
                discount: req.body.update_discount
            };

            await SofaCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/sofa");

        } catch (error) {
            return res.status(401).send(error);
        }
    },

    updateTablePost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const storage = (req.body.update_storage === "on") ? true : false;

            updated_data = {
                table_name: req.body.update_sofa_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                warrenty: req.body.update_warrenty,
                discount: req.body.update_discount,
                max_load: req.body.update_max_load,
                storage: storage
            };

            await TableCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/table");

        } catch (error) {
            console.log(error);
        }
    },

    updateTempalePost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                tempale_name: req.body.update_tempale_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_drawers: req.body.update_no_of_drawers
            };

            await TempaleCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/tempale");

        } catch (error) {
            console.log(error);
        }
    },

    updateTvUnitPost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                tvunit_name: req.body.update_tvunit_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                warrenty: req.body.update_warrenty,
                discount: req.body.update_discount,
                no_of_drawers: req.body.update_no_of_drawers
            };

            await TvUnitCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/tvunit");

        } catch (error) {
            console.log(error);
        }
    },

    updateWardrobePost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                wardrobe_name: req.body.update_wardrobe_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_drawers: req.body.update_no_of_drawers,
                no_of_cupboards: req.body.update_no_of_cupboards
            };

            await WardrobeCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/wardrobe");

        } catch (error) {
            console.log(error);
        }
    },
};