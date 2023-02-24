const TempaleCollection = require('../../src/Models/product/tempale-schema');

module.exports = {

    createTempale: async (req, res) => {
        try {
            console.log("from tempales..");
            console.log(req.body);

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

            return res.status(301).redirect("/admin/product/tempales");

        } catch (error) {
            console.log(error);
        }
    },
    getTempales: async (req, res) => {
        try {
            let result = await TempaleCollection.find({});
            res.status(200).render("products/manage-tempales", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateTempaleGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await TempaleCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-tempale", { result: result });
            }

            res.status(201).send("page not found ...");

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
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - tempale-detail successfully ...");
            return res.status(301).redirect("/admin/product/tempales");

        } catch (error) {
            console.log(error);
        }
    },
    deleteTempale: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await TempaleCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/tempales");

        } catch (error) {
            console.log(error);
        }
    },
};