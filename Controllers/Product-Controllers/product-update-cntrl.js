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
                    return res.status(404).render("errorpage/error-page-404");
                }
            }

            if (result === null)
                return res.status(500).render("errorpage/error-page-500");

            return res.status(201).render(`products/edit-${category}`, { result: result });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateBedPost: async (req, res) => {
        try {
            
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const storage = (req.body.update_storage === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await BedCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/bed");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateChairPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const backrest_type = (req.body.update_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.update_hasWheels === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await ChairCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/chair");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateJulaPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                color: req.body.update_color,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await JulaCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/jula");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateMattressesPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                color: req.body.update_color,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await MattressesCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/mattresse");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateShoerackPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await ShoerackCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/shoerack");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateShowcasePost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await ShowcaseCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/showcase");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateSofaPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                color: req.body.update_color,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await SofaCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/sofa");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateTablePost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const storage = (req.body.update_storage === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await TableCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/table");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateTempalePost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await TempaleCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/tempale");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateTvUnitPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await TvUnitCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/tvunit");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateWardrobePost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                name: req.body.update_name,
                color: req.body.update_color,
                description: req.body.update_description,
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

            if (req.body.image) updated_data.image = req.body.image;
            else if (req.body.rmvImage === "on") updated_data.image = "";

            await WardrobeCollection.updateOne(
                { _id: req.params.pid },
                { $set: updated_data }
            );

            return res.status(301).redirect("/product/wardrobe");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};