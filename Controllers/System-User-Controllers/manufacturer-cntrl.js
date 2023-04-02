const ImportCollection = require('../../Src/Models/system-users/import-schema');
const ManuFacturerCollection = require('../../Src/Models/system-users/manufacturer-schema');

module.exports = {
    createManufacturer: async (req, res) => {
        try {

            await ManuFacturerCollection.insertMany([{
                manufacturer_email: req.body.add_manufacturer_email,
                manufacturer_name: req.body.add_manufacturer_name,
                manufacturer_mobile: req.body.add_manufacturer_mobile,
                manufacturer_factory_name: req.body.add_manufacturer_factory_name,
                manufacturer_factory_address: req.body.add_manufacturer_factory_address,
            }]);
            return res.status(201).redirect("/admin/manufacturers");

        } catch (error) {
            console.log(error);
        }
    },
    getManufacturers: async (req, res) => {
        try {

            //render the page
            const results = await ManuFacturerCollection.find({});
            res.status(201).render("system-users/manage-manufacturers", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateManufacturerGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ManuFacturerCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-manufacturer", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateManufacturerPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                manufacturer_email: req.body.update_manufacturer_email,
                manufacturer_name: req.body.update_manufacturer_name,
                manufacturer_mobile: req.body.update_manufacturer_mobile,
                manufacturer_factory_name: req.body.update_manufacturer_factory_name,
                manufacturer_factory_address: req.body.update_manufacturer_factory_address,
            };

            await ManuFacturerCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            return res.status(201).redirect("/admin/manufacturers");

        } catch (error) {
            console.log(error);
        }
    },
    deleteManufacturer: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                //cascading handle
                await ImportCollection.deleteMany({ manufacturer: target_id });
                await ManuFacturerCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/manufacturers");

        } catch (error) {
            console.log(error);
        }
    },
};
