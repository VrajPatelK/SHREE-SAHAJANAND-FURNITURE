const ShoerackCollection = require('../../src/Models/product/shoerack-schema');

module.exports = {
    createShoerack: async (req, res) => {
        try {
            console.log("from shoeracks..");
            console.log(req.body);

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

            return res.status(301).redirect("/admin/product/shoeracks");

        } catch (error) {
            console.log(error);
        }
    },
    getShoeracks: async (req, res) => {
        try {
            let result = await ShoerackCollection.find({});
            res.status(200).render("products/manage-shoeracks", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateShoerackGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ShoerackCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-shoerack", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateShoerackPost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                shoerack_name: req.body.update_shoerack_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_shelves: req.body.update_no_of_shelves
            };

            await ShoerackCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - shoerack-detail successfully ...");
            return res.status(301).redirect("/admin/product/shoeracks");

        } catch (error) {
            console.log(error);
        }
    },
    deleteShoerack: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ShoerackCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/shoeracks");

        } catch (error) {
            console.log(error);
        }
    },
};