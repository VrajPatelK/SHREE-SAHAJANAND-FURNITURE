const { getAllAccountantData } = require("../../src/Helpers/other-helpers");
const AccountantCollection = require("../../Src/Models/system-users/accountant-schema");

module.exports = {

    createAccountant: async (req, res) => {
        try {
            return res.status(301).redirect("/admin/accountants");

        } catch (error) {
            return res.status(500).send(error);
        }
    },
    getAccountants: async (req, res) => {
        try {
            let accountants = await AccountantCollection.find({});
            let results = await getAllAccountantData(accountants);

            //render the page
            res.status(200).render("system-users/manage-accountants", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateAccountantGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                let accountant = await AccountantCollection.findOne({ accountant_id: target_id });
                let result = new Object();
                result.accountant_study = accountant.accountant_study;
                result.accountant_experience = accountant.accountant_experience;

                return res.status(201).render("system-users/edit-accountant", { result: result });
            }

            return res.status(404).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateAccountantPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                accountant_study: req.body.update_accountant_study,
                accountant_experience: req.body.update_accountant_experience,
            };

            await AccountantCollection.updateOne(
                { accountant_id: req.query._id },
                { $set: updated_data }
            );

            console.log("update - accountant successfully ...");
            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            console.log(error);
        }
    },
    deleteAccountant: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await AccountantCollection.deleteOne({ accountant_id: target_id });

                let user = await UserTypeCollection.findOne({ user_id: target_id });
                user.user_types.splice(user.user_types.indexOf("accountant"));
                await user.save();
            }

            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            console.log(error);
        }
    },
};