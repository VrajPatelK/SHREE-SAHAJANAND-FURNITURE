const AdminCollection = require("../../Src/Models/system-users/admin-schema");
const Bcrypt = require("bcryptjs");

module.exports = {

    getAdmins: async (req, res) => {
        try {

            //render the page
            const results = await AdminCollection.find({});
            res.status(201).render("system-users/manage-admins", { results: results });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateAdminGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await AdminCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-admin", { result: result, swr: false, errorMsg: "admin doesn't exist" });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    updateAdminPost: async (req, res) => {
        try {

            let admin = await AdminCollection.findOne({ admin_email: req.body.admin_email });
            if (admin === null) {
                return res.status(200).render("system-users/edit-admin", { result: req.body, swr: true, errorMsg: "Admin doesn't exist, check Email-Id" });
            }

            admin.admin_email = req.body.admin_email;
            admin.admin_name = req.body.admin_name;
            admin.admin_img = (req.body.rmvImage === "on") ? "" : req.body.admin_img;

            if (req.body.admin_pass)
                admin.admin_pass = Bcrypt.hashSync(req.body.admin_pass);

            await AdminCollection.updateOne(
                { _id: admin._id },
                { $set: admin }
            );

            return res.status(201).redirect("/admin/admins");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },

    deleteAdmin: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await AdminCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/admins");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};
