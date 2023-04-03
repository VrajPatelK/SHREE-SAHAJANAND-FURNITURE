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

            await BedCollection.create({
                name: req.body.add_name,
                stock: req.body.stock,
                image: req.body.image,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/bed");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createChair: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;
            const backrest_type = (req.body.add_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.add_hasWheels === "on") ? true : false;

            await ChairCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/chair");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createJula: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await JulaCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                color: req.body.add_color,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/jula");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createMattresses: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await MattressesCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                color: req.body.add_color,
                description: req.body.add_description,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                material: req.body.add_material
            });

            return res.status(301).redirect("/product/mattresse");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createShoerack: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await ShoerackCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_shelves: req.body.add_no_of_shelves
            });

            return res.status(301).redirect("/product/shoerack");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createShowcase: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await ShowcaseCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_cupboards: req.body.add_no_of_cupboards
            });

            return res.status(301).redirect("/product/showcase");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createSofa: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await SofaCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                color: req.body.add_color,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/sofa");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createTable: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;
            const storage = (req.body.add_storage === "on") ? true : false;
            const material = (req.body.add_name === "dinning_table") ? req.body.add_material : "wood";

            await TableCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/table");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createTempale: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await TempaleCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                no_of_drawers: req.body.add_no_of_drawers
            });

            return res.status(301).redirect("/product/tempale");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createTvUnit: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await TvUnitCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/tvunit");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    createWardrobe: async (req, res) => {
        try {

            const availability = (req.body.add_availability === "on") ? true : false;

            await WardrobeCollection.create({
                name: req.body.add_name,
                stock: req.body.add_stock,
                image: req.body.image,
                color: req.body.add_color,
                description: req.body.add_description,
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
            });

            return res.status(301).redirect("/product/wardrobe");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

};