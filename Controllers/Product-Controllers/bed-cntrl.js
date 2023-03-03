const BedCollection = require('../../Src/Models/products/bed-schema');


module.exports = {

    createBed: async (req, res) => {
        try {
            console.log("from beds..");
            console.log(req.body);

            const availability = (req.body.add_availability === "on") ? true : false;
            const storage = (req.body.add_storage === "on") ? true : false;

            await BedCollection.insertMany([{
                bed_name: req.body.add_bed_name,
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
                storage: storage,
                max_load: req.body.add_max_load,
                capacity: req.body.add_capacity
            }]);

            return res.status(301).redirect("/admin/product/beds");

        } catch (error) {
            console.log(error);
        }
    },
    getBeds: async (req, res) => {
        try {
            let result = await BedCollection.find({});
            res.status(200).render("products/manage-beds", { results: result });

        } catch (error) {
            console.log(error);
        }
    },
    updateBedGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await BedCollection.findOne({ _id: target_id });
                return res.status(201).render("products/edit-bed", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateBedPost: async (req, res) => {
        try {

            let updated_data = new Object();
            const availability = (req.body.update_availability === "on") ? true : false;
            const storage = (req.body.update_storage === "on") ? true : false;

            updated_data = {
                bed_name: req.body.update_bed_name,
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
                max_load: req.body.update_max_load,
                storage: storage,
                capacity: req.body.update_capacity
            };

            await BedCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            console.log("update-bed-detail successfully ...");
            return res.status(301).redirect("/admin/product/beds");

        } catch (error) {
            console.log(error);
        }
    },
    deleteBed: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await BedCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/admin/product/beds");

        } catch (error) {
            console.log(error);
        }
    },
}