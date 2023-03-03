const AdminCollection = require('../../src/Models/system-users/admin-schema');

module.exports = {

    createAdmin: async (req, res) => {
        try {

            let newAdmin = await CustomerCollection.findOne({
                customer_email: req.body.add_admin_email
            });

            if (newAdmin === null) {
                return res.status(200).send("user not found:) to add as a admin:)");
            }

            let admin = new AdminCollection({
                admins: [{
                    admin_email: newAdmin.customer_email,
                    admin_name: newAdmin.customer_name,
                    admin_img: newAdmin.customer_image
                }]
            });

            await admin.save();
            return res.status(201).redirect("/admin/admins");

        } catch (error) {
            console.log(error);
        }
    },

    getAdmins: async (req, res) => {
        try {
            //render the page
            const result = await AdminCollection.findOne({});
            res.status(201).render("system-users/manage-admins", { results: result.admins });

        } catch (error) {
            console.log(error);
        }
    },

    updateAdminGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await AdminCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-admin", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            console.log(error);
        }
    },

    updateAdminPost: async (req, res) => {
        try {
            let updated_data = new Object();
            updated_data.admin_email = req.body.update_admin_email;
            updated_data.admin_name = req.body.update_admin_name;
            updated_data.admin_pass = req.body.update_admin_pass;

            if (req.body.update_admin_img !== "") {
                updated_data.admin_img = req.body.update_admin_img;
            }

            await AdminCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );

            return res.status(201).redirect("/admin/admins");

        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    },
};
