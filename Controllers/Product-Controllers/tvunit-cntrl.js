const TvUnitCollection = require('../../Src/Models/products/tvunit-schema');

module.exports = {

    createTvUnit: async (req, res) => {
        try {
            console.log("from tvunits..");
            console.log(req.body);

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

            return res.status(301).redirect("/admin/product/tvunits");

        } catch (error) {
            console.log(error);
        }
    },
    getTvUnits: async (req, res) => {
        try {
            let result = await TvUnitCollection.find({});
            res.status(200).render("products/manage-tvunits", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateTvUnitGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await TvUnitCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-tvunit", { result: result });
            }

            res.status(201).send("page not found ...");

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
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - tvunit-detail successfully ...");
            return res.status(301).redirect("/admin/product/tvunits");

        } catch (error) {
            console.log(error);
        }
    },
    deleteTvUnit: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await TvUnitCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/tvunits");

        } catch (error) {
            console.log(error);
        }
    },
};