const AdminCollection = require("../Models/system-users/admin-schema");
const ManagerCollection = require("../Models/system-users/manager-schema");
// const AccountantCollection = require("../Models/system-users/accountant-schema");

const jwt = require("jsonwebtoken");


module.exports = {

    isAdmin: async (req, res, next) => {
        try {
            let token = req.cookies.loginAdmin;
            let adminId = jwt.verify(token, process.env.SECRET_KEY);

            req.token = token;
            req.admin = await AdminCollection.findOne({ _id: adminId._id });

            next();

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(301).redirect("/sys-user/login");
            }
            console.log(error);
            return res.status(401).json(error);
        }
    },
    isManager: async (req, res, next) => {
        try {
            let token = req.cookies.loginManager;
            let managerId = jwt.verify(token, process.env.SECRET_KEY);

            req.token = token;
            req.manager = await ManagerCollection.findOne({ _id: managerId._id });

            next();

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(301).redirect("/sys-user/login");
            }
            console.log(error);
            return res.status(401).json(error);
        }
    },
}