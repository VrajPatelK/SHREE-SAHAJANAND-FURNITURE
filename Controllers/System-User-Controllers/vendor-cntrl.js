const ExportCollection = require('../../Src/Models/system-users/export-schema');
const VendorCollection = require('../../Src/Models/system-users/vendor-schema');

module.exports = {
    createVendor: async (req, res) => {
        try {
            await VendorCollection.insertMany([{
                vendor_email: req.body.add_vendor_email,
                vendor_name: req.body.add_vendor_name,
                vendor_mobile: req.body.add_vendor_mobile,
                vendor_shop_name: req.body.add_vendor_shop_name,
                vendor_shop_address: req.body.add_vendor_shop_address,
            }]);
            return res.status(201).redirect("/admin/vendors");

        } catch (error) {
            console.log(error);
        }
    },
    getVendors: async (req, res) => {
        try {

            //render the page
            const results = await VendorCollection.find({});
            res.status(201).render("system-users/manage-vendors", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateVendorGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await VendorCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-vendor", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateVendorPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                vendor_email: req.body.update_vendor_email,
                vendor_name: req.body.update_vendor_name,
                vendor_mobile: req.body.update_vendor_mobile,
                vendor_shop_name: req.body.update_vendor_shop_name,
                vendor_shop_address: req.body.update_vendor_shop_address,
            };

            await VendorCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            return res.status(201).redirect("/admin/vendors");

        } catch (error) {
            console.log(error);
        }
    },
    deleteVendor: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {

                // cascading handle
                await ExportCollection.deleteMany({ vendor: target_id });
                await VendorCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/vendors");

        } catch (error) {
            console.log(error);
        }
    },
};