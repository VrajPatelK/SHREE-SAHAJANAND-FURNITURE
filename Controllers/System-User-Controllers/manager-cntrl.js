const ManagerCollection = require('../../src/Models/admin/manager-schema');
const CustomerCollection = require('../../src/Models/customer-schema');
const UserTypeCollection = require('../../src/Models/user-type-schema');
const { getAllManagerData } = require("../../src/Helpers/other-helpers");

module.exports = {

    createManager: async (req, res) => {
        try {


            //verify email-id as customer
            let customer = await CustomerCollection.findOne({ customer_email: req.body.add_manager_email });
            if (customer === null) {
                return res.status(403).send("manager is not registerd !!!");
            }


            //save the manager data
            const manager = new ManagerCollection({
                manager_id: customer._id,
                manager_skill: req.body.add_manager_skill,
                manager_study: req.body.add_manager_study,
                manager_experience: req.body.add_manager_experience,
            });
            await manager.save();

            //set - user type
            const user = await UserTypeCollection.findOne({ user_id: customer._id });
            user.user_types.push("manager");
            await user.save();

            return res.status(301).redirect("/admin/managers");

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getManagers: async (req, res) => {
        try {

            let managers = await ManagerCollection.find({});
            let results = await getAllManagerData(managers);
            
            //render the page
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

                let manager = await ManagerCollection.findOne({ manager_id: target_id });

                let result = new Object();
                result.manager_skill = manager.manager_skill;
                result.manager_study = manager.manager_study;
                result.manager_experience = manager.manager_experience;

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
                manager_study: req.body.update_manager_study,
                manager_experience: req.body.update_manager_experience,
                manager_skill: req.body.update_manager_skill
            };

            await ManagerCollection.updateOne(
                { manager_id: req.query._id },
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
                await ManagerCollection.deleteOne({ manager_id: target_id });
                await UserTypeCollection.deleteOne({ user_id: target_id });
            }

            return res.status(201).redirect("/admin/managers");

        } catch (error) {
            console.log(error);
        }
    },
};