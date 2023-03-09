const AdminCollection = require("../../src/Models/system-users/admin-schema");
const AccountantCollection = require("../../Src/Models/system-users/accountant-schema");
const ManagerCollection = require("../../src/Models/system-users/manager-schema");
const Bcrypt = require("bcryptjs");

module.exports = {

    getLoginSystemUser: async (req, res) => {
        try {

            return res.status(200).render("system-users/admin-login", { swr: false });

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
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Admin doesn't exist with this Email-ID"
                    });
                }

                //check-password
                if (!Bcrypt.compareSync(req.body.sys_user_pass, admin.admin_pass)) {
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Wrong Email/Password ..."
                    });
                }

                // create and push token
                let token = await admin.createToken();
                await admin.save(); //save admin

                // cerate a cookie & session
                res.cookie("loginAdmin", token, { httpOnly: true });
                res.locals.session.userType = "admin";

                return res.status(301).redirect("/admin/sells");
            }

            if (system_user === "Accountant") {
                let accountant = await AccountantCollection.findOne({ accountant_email: req.body.sys_user_email });

                if (accountant === null) {
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Accountant doesn't exist with this Email-ID"
                    });
                }

                //check-password
                if (!Bcrypt.compareSync(req.body.sys_user_pass, accountant.accountant_pass)) {
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Wrong Email/Password ..."
                    });
                }

                // create and push token
                let token = await accountant.createToken();
                await accountant.save(); //save accountant

                // cerate a cookie & session
                res.cookie("loginAccountant", token, { httpOnly: true });
                res.locals.session.userType = "accountant";

                return res.status(301).redirect("/admin/sells");
            }

            if (system_user === "Manager") {
                let manager = await ManagerCollection.findOne({ manager_email: req.body.sys_user_email });

                if (manager === null) {
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Manager doesn't exist with this Email-ID"
                    });
                }

                //check-password
                if (!Bcrypt.compareSync(req.body.sys_user_pass, manager.manager_pass)) {
                    return res.status(200).render("system-users/admin-login", {
                        swr: true,
                        result: req.body,
                        errorMsg: "Wrong Email/Password ..."
                    });
                }

                // create and push token
                let token = await manager.createToken();
                await manager.save(); //save manager

                // cerate a cookie & session
                res.cookie("loginManager", token, { httpOnly: true });
                res.locals.session.userType = "manager";

                return res.status(301).redirect("/admin/sells");
            }

        } catch (error) {
            console.log(error);
        }
    },
};