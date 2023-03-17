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

    createBed: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;
            const storage = (req.body.add_storage === "on") ? true : false;

            await BedCollection.insertMany([{
                bed_name: req.body.add_bed_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                warrenty: req.body.add_warrenty,
                discount: req.body.add_discount,
                storage: storage,
                max_load: req.body.add_max_load,
                capacity: req.body.add_capacity
            }]);

            return res.status(301).redirect("/product/bed");

        } catch (error) {
            console.log(error);
        }
    },

    createChair: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;
            const backrest_type = (req.body.add_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.add_hasWheels === "on") ? true : false;

            await ChairCollection.insertMany([{
                chair_name: req.body.add_chair_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                material: req.body.add_material,
                max_load: req.body.add_max_load,
                backrest_type: backrest_type,
                hasWheels: hasWheels
            }]);

            return res.status(301).redirect("/product/chair");

        } catch (error) {
            console.log(error);
        }
    },

    createJula: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await JulaCollection.insertMany([{
                jula_name: req.body.add_jula_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                seaters: req.body.add_seaters,
                max_load: req.body.add_max_load
            }]);

            return res.status(301).redirect("/product/jula");

        } catch (error) {
            console.log(error);
        }
    },

    createMattresses: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await MattressesCollection.insertMany([{
                mattresses_name: req.body.add_mattresses_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                material: req.body.add_material
            }]);

            return res.status(301).redirect("/product/mattresse");

        } catch (error) {
            console.log(error);
        }
    },

    createShoerack: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await ShoerackCollection.insertMany([{
                shoerack_name: req.body.add_shoerack_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_shelves: req.body.add_no_of_shelves
            }]);

            return res.status(301).redirect("/product/shoerack");

        } catch (error) {
            console.log(error);
        }
    },

    createShowcase: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await ShowcaseCollection.insertMany([{
                showcase_name: req.body.add_showcase_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_cupboards: req.body.add_no_of_cupboards
            }]);

            return res.status(301).redirect("/product/showcase");

        } catch (error) {
            console.log(error);
        }
    },

    createSofa: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await SofaCollection.insertMany([{
                sofa_name: req.body.add_sofa_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                material: req.body.add_material,
                seaters: req.body.add_seaters,
                warrenty: req.body.add_warrenty,
                discount: req.body.add_discount
            }]);

            return res.status(301).redirect("/product/sofa");

        } catch (error) {
            return res.status(500).json({ error: true, em: `product post request failed:)` });
        }
    },

    createTable: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;
            const storage = (req.body.add_storage === "on") ? true : false;
            const material = (req.body.add_table_name === "dinning_table") ? req.body.add_material : "wood";

            await TableCollection.insertMany([{
                table_name: req.body.add_table_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                material: material,
                price: req.body.add_price,
                seaters: req.body.add_seaters,
                warrenty: req.body.add_warrenty,
                discount: req.body.add_discount,
                storage: storage,
                max_load: req.body.add_max_load
            }]);

            return res.status(301).redirect("/product/table");

        } catch (error) {
            console.log(error);
        }
    },

    createTempale: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await TempaleCollection.insertMany([{
                tempale_name: req.body.add_tempale_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_drawers: req.body.add_no_of_drawers
            }]);

            return res.status(301).redirect("/product/tempale");

        } catch (error) {
            console.log(error);
        }
    },

    createTvUnit: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await TvUnitCollection.insertMany([{
                tvunit_name: req.body.add_tvunit_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                warrenty: req.body.add_warrenty,
                discount: req.body.add_discount,
                no_of_drawers: req.body.add_no_of_drawers
            }]);

            return res.status(301).redirect("/product/tvunit");

        } catch (error) {
            console.log(error);
        }
    },

    createWardrobe: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await WardrobeCollection.insertMany([{
                wardrobe_name: req.body.add_wardrobe_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_drawers: req.body.add_no_of_drawers,
                no_of_cupboards: req.body.add_no_of_cupboards
            }]);

            return res.status(301).redirect("/product/wardrobe");

        } catch (error) {
            console.log(error);
        }
    },

};