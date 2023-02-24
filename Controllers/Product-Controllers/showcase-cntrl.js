const ShowcaseCollection = require('../../src/Models/product/showcase-schema');

module.exports = {

    createShowcase: async (req, res) => {
        try {
            console.log("from showcases..");
            console.log(req.body);

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

            return res.status(301).redirect("/admin/product/showcases");

        } catch (error) {
            console.log(error);
        }
    },
    getShowcases: async (req, res) => {
        try {
            let result = await ShowcaseCollection.find({});
            res.status(200).render("products/manage-showcases", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateShowcaseGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ShowcaseCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-showcase", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateShowcasePost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                showcase_name: req.body.update_showcase_name,
                img_link: req.body.update_img_link,
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

            await ShowcaseCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - showcase-detail successfully ...");
            return res.status(301).redirect("/admin/product/showcases");

        } catch (error) {
            console.log(error);
        }
    },
    deleteShowcase: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ShowcaseCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/showcases");

        } catch (error) {
            console.log(error);
        }
    },
};