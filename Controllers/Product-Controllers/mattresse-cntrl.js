const MattressesCollection = require('../../Src/Models/products/mattresses-schema');

module.exports = {

    createMattresses: async (req, res) => {
        try {
            console.log("from mattresses..");
            console.log(req.body);

            const availability = (req.body.add_availability === "on") ? true : false;

            await MattressesCollection.insertMany([{
                mattresses_name: req.body.add_mattresses_name,
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
                material: req.body.add_material
            }]);

            return res.status(301).redirect("/admin/product/mattresses");

        } catch (error) {
            console.log(error);
        }
    },
    getMattressess: async (req, res) => {
        try {
            let result = await MattressesCollection.find({});
            res.status(200).render("products/manage-mattresses", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateMattressesGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await MattressesCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-mattresses", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateMattressesPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                mattresses_name: req.body.update_mattresses_name,
                img_link: req.body.update_img_link,
                color: req.body.update_color,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                discount: req.body.update_discount
            };

            await MattressesCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - mattresses-detail successfully ...");
            return res.status(301).redirect("/admin/product/mattresses");

        } catch (error) {
            console.log(error);
        }
    },
    deleteMattresses: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await MattressesCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/mattresses");

        } catch (error) {
            console.log(error);
        }
    },
};