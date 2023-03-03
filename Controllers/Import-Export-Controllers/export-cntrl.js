const ExportCollection = require('../../src/Models/system-users/export-schema');
const VendorCollection = require('../../src/Models/system-users/vendor-schema');
const { addVendorDetails } = require('../../src/Helpers/import-export-helpers');


module.exports = {
    createExport: async (req, res) => {
        try {

            //check whether vendor is exist
            let vendor_data = await VendorCollection.findOne({ vendor_email: req.body.key_vendor_email });

            if (vendor_data === null) {
                return res.send("vendor doesn't exist ...");
            }

            //create a bill
            let original_bill = (req.body.add_item_quantity * req.body.add_item_price);
            let total_bill = original_bill + (original_bill * ((req.body.add_gst + req.body.add_cgst) / 100));

            // insert a data
            await ExportCollection.insertMany([{

                key_vendor_email: req.body.key_vendor_email,
                item_info: {
                    item_name: req.body.add_item_name,
                    item_price: req.body.add_item_price,
                    item_quantity: req.body.add_item_quantity
                },
                gst: req.body.add_gst,
                cgst: req.body.add_cgst,
                total_bill: total_bill,
                date_and_time: `Date : ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} || Time : ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            }]);

            return res.status(201).redirect("/admin/exports");

        } catch (error) {
            console.log(error);
        }
    },
    getExports: async (req, res) => {
        try {

            //render the page
            let results = await ExportCollection.find({});

            results = await addVendorDetails(results);
            res.status(201).render("system-users/manage-exports", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateExportGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ExportCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-export", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateExportPost: async (req, res) => {
        try {

            //check whether vendor is exist
            let vendor_data = await VendorCollection.findOne({ vendor_email: req.body.update_key_vendor_email });

            if (vendor_data === null) {
                return res.send("vendor doesn't exist ...");
            }

            //create a updtaed bill
            let original_bill = (req.body.update_item_quantity * req.body.update_item_price);
            let total_bill = original_bill + (original_bill * ((req.body.update_gst + req.body.update_cgst) / 100));

            let updated_data = new Object();
            updated_data = {
                key_vendor_email: req.body.update_key_vendor_email,
                item_info: {
                    item_name: req.body.update_item_name,
                    item_price: req.body.update_item_price,
                    item_quantity: req.body.update_item_quantity
                },
                gst: req.body.update_gst,
                cgst: req.body.update_cgst,
                total_bill: total_bill
            };

            await ExportCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            console.log("update - exports-data successfully ...");
            return res.status(201).redirect("/admin/exports");

        } catch (error) {
            console.log(error);
        }
    },
    deleteExport: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ExportCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/exports");

        } catch (error) {
            console.log(error);
        }
    },
};