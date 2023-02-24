const ManagerCollection = require('../../src/Models/admin/manager-schema');


module.exports = {

    createManager: async (req, res) => {
        try {
            console.log(req.body);
            await ManagerCollection.insertMany([{
                manager_email: req.body.add_manager_email,
                manager_name: req.body.add_manager_name,
                manager_img: req.body.add_manager_img,
                manager_mobile: req.body.add_manager_mobile,
                manager_address: req.body.add_manager_address,
                manager_study: req.body.add_manager_study,
                manager_experience: req.body.add_manager_experience,
                manager_skill: req.body.add_manager_skill,
                manager_pass: req.body.add_manager_pass

            }]);
            return res.status(201).redirect("/admin/managers");

        } catch (error) {
            console.log(error);
        }
    },
    getManagers: async (req, res) => {
        try {

            //render the page
            const results = await ManagerCollection.find({});
            res.status(201).render("admin/manage-managers", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateManagerGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await ManagerCollection.findOne({ _id: target_id });
                return res.status(201).render("admin/edit-manager", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateManagerPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                manager_email: req.body.update_manager_email,
                manager_name: req.body.update_manager_name,
                manager_mobile: req.body.update_manager_mobile,
                manager_address: req.body.update_manager_address,
                manager_pass: req.body.update_manager_pass
            };

            if (req.body.update_accountant_img) { updated_data.accountant_img = req.body.update_accountant_img; }
            if (req.body.update_accountant_study) { updated_data.accountant_study = req.body.update_accountant_study; }
            if (req.body.update_accountant_experience) { updated_data.accountant_experience = req.body.update_accountant_experience; }
            if (req.body.update_accountant_skill) { updated_data.accountant_skill = req.body.update_accountant_skill; }

            await ManagerCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            console.log("update - manager successfully ...");
            return res.status(201).redirect("/admin/managers");

        } catch (error) {
            console.log(error);
        }
    },
    deleteManager: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ManagerCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/managers");

        } catch (error) {
            console.log(error);
        }
    },
};