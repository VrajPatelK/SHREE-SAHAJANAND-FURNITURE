const SofaCollection = require('../../src/Models/product/sofa-schema');

module.exports = {

    createSofa: async (req, res) => {
        try {
            console.log("from sofas..");
            const availability = (req.body.add_availability === "on") ? true : false;
            await SofaCollection.insertMany([{
                sofa_name: req.body.add_sofa_name,
                img_link: req.body.add_img_link,
                color: req.body.add_color,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                material: req.body.add_material,
                seaters: req.body.add_seaters,
                warrenty: req.body.add_warrenty,
                discount: req.body.add_discount
            }]);

            return res.status(301).redirect("/admin/product/sofas");

        } catch (error) {
            console.log(error);
        }
    },
    getSofas: async (req, res) => {
        try {
            let result = await SofaCollection.find({});
            res.status(200).render("products/manage-sofas", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateSofaGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await SofaCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-sofa", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateSofaPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;

            updated_data = {
                sofa_name: req.body.update_sofa_name,
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
                seaters: req.body.update_seaters,
                warrenty: req.body.update_warrenty,
                discount: req.body.update_discount
            };

            await SofaCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - sofa-detail successfully ...");
            return res.status(301).redirect("/admin/product/sofas");

        } catch (error) {
            console.log(error);
        }
    },
    deleteSofa: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await SofaCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/sofas");

        } catch (error) {
            console.log(error);
        }
    },
};