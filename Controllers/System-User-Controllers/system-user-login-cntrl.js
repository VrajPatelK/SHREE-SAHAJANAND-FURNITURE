const AdminCollection = require("../../src/Models/system-users/admin-schema");
const AccountantCollection = require("../../Src/Models/system-users/accountant-schema");
const ManagerCollection = require("../../src/Models/system-users/manager-schema");
const Bcrypt = require("bcryptjs");

module.exports = {

    getLoginSystemUser: async (req, res) => {
        try {

            return res.status(200).render("system-users/admin-login", {
                somethingWentWrong: undefined,
                errorMsg: undefined
            });

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    postLoginSystemUser: async (req, res) => {
        try {

            let system_user = req.body.system_user;

            if (system_user === "Admin") {

                let admin = await AdminCollection.findOne({ admin_email: req.body.sys_user_email });
                if (admin === null) {
                    admin = new AdminCollection({
                        admin_email: req.body.sys_user_email,
                        admin_pass: Bcrypt.hashSync(req.body.sys_user_pass),
                    });
                }
                else {

                    //check-password
                    if (!Bcrypt.compare(req.body.sys_user_pass, admin.admin_password)) {
                        return res.status(200).render("/admin-login", { wrongPass: true });
                    }
                }

                // create and push token
                let token = await admin.createToken();
                await admin.save(); //save admin

                // cerate a cookie & session
                res.cookie("loginAdmin", token, { httpOnly: true });
                res.locals.session.userType = "admin";

                return res.status(200).render("sells");
            }

            if (system_user === "Accountant") {

            }

            if (system_user === "Manager") {
                managerLogin(req.body, res, ManagerCollection);
                return res.status(200).render("sells");

            }

        } catch (error) {
            console.log(error);
        }
    },
};