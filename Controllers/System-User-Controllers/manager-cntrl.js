const ManagerCollection = require('../../src/Models/system-users/manager-schema');
const Bcrypt = require("bcryptjs")

module.exports = {

    getCreateManager: async (req, res) => {
        try {
            return res.status(200).render("system-users/create-manager", {
                swr: false,
                errorMsg: "Manager already exist..."
            });
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    postCreateManager: async (req, res) => {
        try {

            let manager = await ManagerCollection.findOne({ manager_email: req.body.manager_email });
            if (manager !== null)
                return res.status(200).render("system-users/create-manager", { result: req.body, swr: true, errorMsg: "Manager is already with this Email-Id..." });

            manager = await ManagerCollection.findOne({ manager_mobile: req.body.manager_mobile });
            if (manager !== null)
                return res.status(200).render("system-users/create-manager", { result: req.body, swr: true, errorMsg: "Manager is already with this Mobile number..." });

            req.body.manager_pass = Bcrypt.hashSync(req.body.manager_pass);

            manager = await ManagerCollection.create(req.body);

            return res.status(301).redirect("/admin/managers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getManagers: async (req, res) => {
        try {

            let managers = await ManagerCollection.find({});

            //render the page
            res.status(200).render("system-users/manage-managers", { results: managers });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateManagerGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {
                let manager = await ManagerCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-manager", { result: manager, swr: false, errorMsg: "" });
            }

            return res.status(404).render("errorpage/error-page-404");
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateManagerPost: async (req, res) => {
        try {

            let manager = await ManagerCollection.findOne({ manager_email: req.body.manager_email });
            if (manager !== null && manager._id.toString() !== req.query._id)
                return res.status(200).render("system-users/edit-manager", { result: req.body, swr: true, errorMsg: "Manager is already with this Email-Id..." });

            manager = await ManagerCollection.findOne({ manager_mobile: req.body.manager_mobile });
            if (manager !== null && manager._id.toString() !== req.query._id)
                return res.status(200).render("system-users/edit-manager", { result: req.body, swr: true, errorMsg: "Manager is already with this Mobile number..." });

            manager = req.body;
            manager.manager_image = (req.body.rmvImage) ? "" : req.body.manager_image;

            await ManagerCollection.updateOne(
                { _id: req.query._id },
                { $set: manager }
            );

            return res.status(201).redirect("/admin/managers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deleteManager: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await ManagerCollection.deleteOne({ manager_id: target_id });
            }

            return res.status(301).redirect("/admin/managers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};