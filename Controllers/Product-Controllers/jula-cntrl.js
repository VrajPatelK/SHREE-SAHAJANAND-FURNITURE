const JulaCollection = require('../../src/Models/product/jula-schema');

module.exports = {

    createJula: async (req, res) => {
        try {
            console.log("from showcases..");
            console.log(req.body);

            const availability = (req.body.add_availability === "on") ? true : false;

            await JulaCollection.insertMany([{
                jula_name: req.body.add_jula_name,
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
                seaters: req.body.add_seaters,
                max_load: req.body.add_max_load
            }]);

            return res.status(301).redirect("/admin/product/julas");

        } catch (error) {
            console.log(error);
        }
    },
    getJulas: async (req, res) => {
        try {
            let result = await JulaCollection.find({});
            res.status(200).render("products/manage-julas", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateJulaGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await JulaCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-jula", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateJulaPost: async (req, res) => {
        try {
            console.log(req.body);

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                jula_name: req.body.update_jula_name,
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
                seaters: req.body.update_seaters,
                max_load: req.body.update_max_load
            };

            await JulaCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - jula-detail successfully ...");
            return res.status(301).redirect("/admin/product/julas");

        } catch (error) {
            console.log(error);
        }
    },
    deleteJula: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await JulaCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/julas");

        } catch (error) {
            console.log(error);
        }
    },
};