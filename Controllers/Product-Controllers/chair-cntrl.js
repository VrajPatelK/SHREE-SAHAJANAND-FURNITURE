const ChairCollection = require('../../Src/Models/products/chair-schema');

module.exports = {

    createChair: async (req, res) => {
        try {
            console.log("from chairs..");
            console.log(req.body);

            const availability = (req.body.add_availability === "on") ? true : false;
            const backrest_type = (req.body.add_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.add_hasWheels === "on") ? true : false;

            await ChairCollection.insertMany([{
                chair_name: req.body.add_chair_name,
                img_link: req.body.add_img_link,
                dimensions: {
                    length: req.body.add_length,
                    width: req.body.add_width,
                    height: req.body.add_height
                },
                availability: availability,
                price: req.body.add_price,
                discount: req.body.add_discount,
                material: req.body.add_material,
                max_load: req.body.add_max_load,
                backrest_type: backrest_type,
                hasWheels: hasWheels
            }]);

            return res.status(301).redirect("/admin/product/chairs");

        } catch (error) {
            console.log(error);
        }
    },
    getChairs: async (req, res) => {
        try {
            let result = await ChairCollection.find({});
            res.status(200).render("products/manage-chairs", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateChairGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ChairCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-chair", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateChairPost: async (req, res) => {
        try {
            console.log(req.body);
            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const backrest_type = (req.body.update_backrest_type === "on") ? true : false;
            const hasWheels = (req.body.update_hasWheels === "on") ? true : false;

            updated_data = {
                chair_name: req.body.update_chair_name,
                img_link: req.body.update_img_link,
                dimensions: {
                    length: req.body.update_length,
                    width: req.body.update_width,
                    height: req.body.update_height
                },
                availability: availability,
                price: req.body.update_price,
                material: req.body.update_material,
                discount: req.body.update_discount,
                max_load: req.body.update_max_load,
                backrest_type: backrest_type,
                hasWheels: hasWheels
            };

            await ChairCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - chair-detail successfully ...");
            return res.status(301).redirect("/admin/product/chairs");

        } catch (error) {
            console.log(error);
        }
    },
    deleteChair: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ChairCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/chairs");

        } catch (error) {
            console.log(error);
        }
    },
}