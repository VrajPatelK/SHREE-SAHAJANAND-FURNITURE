const jwt = require("jsonwebtoken");

const AdminCollection = require("../Models/system-users/admin-schema");
const ManagerCollection = require("../Models/system-users/manager-schema");
const CustomerCollection = require("../Models/customers/customer-schema");
const AccountantCollection = require("../Models/system-users/accountant-schema");

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
    isAccountant: async (req, res, next) => {

        try {
            let token = req.cookies.loginAccountant;
            let accountantId = jwt.verify(token, process.env.SECRET_KEY);

            req.token = token;
            req.accountant = await AccountantCollection.findOne({ _id: accountantId._id });

            next();

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(301).redirect("/sys-user/login");
            }
            console.log(error);
            return res.status(401).json(error);
        }
    },
    isCustomer: async (req, res, next) => {
        try {
            let token = req.cookies.loginCustomer;
            let customerId = jwt.verify(token, process.env.SECRET_KEY);

            req.token = token;
            req.customer = await CustomerCollection.findOne({ _id: customerId._id });

            next();

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(301).redirect("/");
            }
            console.log(error);
            return res.status(401).json(error);
        }
    },
    customerNotLoggedIn: async (req, res, next) => {
        try {
            let token = req.cookies.loginCustomer;
            let customer = jwt.verify(token, process.env.SECRET_KEY);
            return res.status(301).redirect("/customer-profile");

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                let url = req.originalUrl;

                if (url === '/customer-register')
                    return res.status(201).render("customer/customer-register", { swr: false })

                if (url === '/')
                    return res.status(201).render("index", { swr: false });

            }
            return res.status(401).send(error);
        }
    }
}