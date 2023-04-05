const AccountantCollection = require("../../src/Models/system-users/accountant-schema");
const Bcrypt = require("bcryptjs");

module.exports = {
    getCreateAccountant: async (req, res) => {
        try {
            return res.status(200).render("system-users/create-accountant", {
                swr: false,
                errorMsg: "Accountant already exist..."
            });
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    postCreateAccountant: async (req, res) => {
        try {

            let accountant = await AccountantCollection.findOne({ accountant_email: req.body.accountant_email });
            if (accountant !== null)
                return res.status(200).render("system-users/create-accountant", { result: req.body, swr: true, errorMsg: "Accountant is already with this Email-Id..." });

            accountant = await AccountantCollection.findOne({ accountant_mobile: req.body.accountant_mobile });
            if (accountant !== null)
                return res.status(200).render("system-users/create-accountant", { result: req.body, swr: true, errorMsg: "Accountant is already with this Mobile number..." });

            req.body.accountant_pass = Bcrypt.hashSync(req.body.accountant_pass);
            accountant = await AccountantCollection.create(req.body);

            return res.status(301).redirect("/admin/accountants");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getAccountants: async (req, res) => {
        try {
            let accountants = await AccountantCollection.find({});

            //render the page
            res.status(200).render("system-users/manage-accountants", { results: accountants });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateAccountantGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {
                let accountant = await AccountantCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-accountant", { result: accountant, swr: false, errorMsg: "" });
            }

            return res.status(404).render("errorpage/error-page-404");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateAccountantPost: async (req, res) => {
        try {

            let accountant = await AccountantCollection.findOne({ accountant_email: req.body.accountant_email });
            if (accountant !== null && accountant._id.toString() !== req.query._id)
                return res.status(200).render("system-users/edit-accountant", { result: req.body, swr: true, errorMsg: "Accountant is already with this Email-Id..." });

            accountant = await AccountantCollection.findOne({ accountant_mobile: req.body.accountant_mobile });
            if (accountant !== null && accountant._id.toString() !== req.query._id)
                return res.status(200).render("system-users/edit-accountant", { result: req.body, swr: true, errorMsg: "Accountant is already with this Mobile number..." });

            accountant = req.body;
            accountant.accountant_image = (req.body.rmvImage) ? "" : req.body.accountant_image;

            await AccountantCollection.updateOne(
                { _id: req.query._id },
                { $set: accountant }
            );

            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deleteAccountant: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await AccountantCollection.deleteOne({ accountant_id: target_id });
            }

            return res.status(201).redirect("/admin/accountants");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};