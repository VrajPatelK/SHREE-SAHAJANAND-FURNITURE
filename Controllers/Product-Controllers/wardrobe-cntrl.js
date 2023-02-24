const WardrobeCollection = require('../../src/Models/product/sofa-schema');

module.exports = {

    createWardrobe: async (req, res) => {
        try {
            console.log("from wardrobes..");
            console.log(req.body);

            const availability = (req.body.add_availability === "on") ? true : false;

            await WardrobeCollection.insertMany([{
                wardrobe_name: req.body.add_wardrobe_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
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
            }]);

            return res.status(301).redirect("/admin/product/wardrobes");

        } catch (error) {
            console.log(error);
        }
    },
    getWardrobes: async (req, res) => {
        try {
            let result = await WardrobeCollection.find({});
            res.status(200).render("products/manage-wardrobes", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateWardrobeGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await WardrobeCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-wardrobe", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateWardrobePost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                wardrobe_name: req.body.update_wardrobe_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                discount: req.body.update_discount,
                no_of_drawers: req.body.update_no_of_drawers,
                no_of_cupboards: req.body.update_no_of_cupboards
            };

            await WardrobeCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - wardrobe-detail successfully ...");
            return res.status(301).redirect("/admin/product/wardrobes");

        } catch (error) {
            console.log(error);
        }
    },
    deleteWardrobe: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await WardrobeCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/wardrobes");

        } catch (error) {
            console.log(error);
        }
    },
};