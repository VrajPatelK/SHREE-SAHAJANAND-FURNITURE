const TableCollection = require('../../src/Models/product/table-schema');

module.exports = {

    createTable: async (req, res) => {
        try {
            console.log("from tables..");
            console.log(req.body);

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

            return res.status(301).redirect("/admin/product/tables");

        } catch (error) {
            console.log(error);
        }
    },
    getTables: async (req, res) => {
        try {
            let result = await TableCollection.find({});
            res.status(200).render("products/manage-tables", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateTableGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await TableCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-table", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
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
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - table-detail successfully ...");
            return res.status(301).redirect("/admin/product/tables");

        } catch (error) {
            console.log(error);
        }
    },
    deleteTable: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await TableCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/tables");

        } catch (error) {
            console.log(error);
        }
    },
};