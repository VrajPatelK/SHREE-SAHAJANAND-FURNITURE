const AccountantCollection = require('../../src/Models/admin/accountant-schema');


module.exports = {

    createAccountant: async (req, res) => {
        try {
            console.log(req.body);
            await AccountantCollection.insertMany([{
                accountant_email: req.body.add_accountant_email,
                accountant_name: req.body.add_accountant_name,
                accountant_img: req.body.add_accountant_img,
                accountant_mobile: req.body.add_accountant_mobile,
                accountant_address: req.body.add_accountant_address,
                accountant_study: req.body.add_accountant_study,
                accountant_experience: req.body.add_accountant_experience,
                accountant_pass: req.body.add_accountant_pass

            }]);
            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            console.log(error);
        }
    },
    getAccountants: async (req, res) => {
        try {

            //render the page
            const results = await AccountantCollection.find({});
            res.status(201).render("admin/manage-accountants", { results: results });

        } catch (error) {
            console.log(error);
        }
    },
    updateAccountantGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await AccountantCollection.findOne({ _id: target_id });
                return res.status(201).render("admin/edit-accountant", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },
    updateAccountantPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                accountant_email: req.body.update_accountant_email,
                accountant_name: req.body.update_accountant_name,
                accountant_mobile: req.body.update_accountant_mobile,
                accountant_address: req.body.update_accountant_address,
                accountant_pass: req.body.update_accountant_pass
            };

            if (req.body.update_accountant_img) { updated_data.accountant_img = req.body.update_accountant_img; }
            if (req.body.update_accountant_study) { updated_data.accountant_study = req.body.update_accountant_study; }
            if (req.body.update_accountant_experience) { updated_data.accountant_experience = req.body.update_accountant_experience; }

            await AccountantCollection.updateOne(
                { _id: req.query._id },
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
                await AccountantCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            console.log(error);
        }
    },
};