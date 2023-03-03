const ImportCollection = require('../../src/Models/system-users/import-schema');
const ManuFacturerCollection = require('../../src/Models/system-users/manufacturer-schema');
const { addManufacturerDetails } = require('../../src/Helpers/import-export-helpers');


module.exports = {
    createImport: async (req, res) => {
        try {

            //check whether manufacturer is exist
            let manufacturer_data = await ManuFacturerCollection.findOne({ manufacturer_email: req.body.key_manufacturer_email });

            if (manufacturer_data === null) {
                return res.send("manufacturer doesn't exist ...");
            }


            //create a bill
            let total_bill = (req.body.add_item_quantity * req.body.add_item_price);

            // insert a data
            await ImportCollection.insertMany([{

                key_manufacturer_email: req.body.key_manufacturer_email,
                item_info: {
                    item_name: req.body.add_item_name,
                    item_price: req.body.add_item_price,
                    item_quantity: req.body.add_item_quantity
                },
                total_bill: total_bill,
                date_and_time: `Date : ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} || Time : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            }]);

            return res.status(201).redirect("/admin/imports");

        } catch (error) {
            console.log(error);
        }
    },
    getImports: async (req, res) => {
        try {

            //render the page
            let results = await ImportCollection.find({});

            results = await addManufacturerDetails(results);
            res.status(201).render("system-users/manage-imports", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateImportGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ImportCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-import", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateImportPost: async (req, res) => {
        try {

            //check whether manufacturer is exist
            let manufacturer_data = await ManuFacturerCollection.findOne({ manufacturer_email: req.body.update_key_manufacturer_email });

            if (manufacturer_data === null) {
                return res.send("manufacturer doesn't exist ...");
            }

            //create a updtaed bill
            let total_bill = (req.body.update_item_quantity * req.body.update_item_price);

            let updated_data = new Object();
            updated_data = {
                key_manufacturer_email: req.body.update_key_manufacturer_email,
                item_info: {
                    item_name: req.body.update_item_name,
                    item_price: req.body.update_item_price,
                    item_quantity: req.body.update_item_quantity
                },
                total_bill: total_bill
            };

            await ImportCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            console.log("update - imports-data successfully ...");
            return res.status(201).redirect("/admin/imports");

        } catch (error) {
            console.log(error);
        }
    },
    deleteImport: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ImportCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/imports");

        } catch (error) {
            console.log(error);
        }
    },
};