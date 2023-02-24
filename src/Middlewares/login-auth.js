const jwt = require('jsonwebtoken');
const CustomerCollection = require("../Models/customer-schema");

module.exports = {
    isLogin: async (req, res, next) => {
        try {
            let token = req.cookies.loginCookie;
            emailObj = jwt.verify(token, process.env.SECRET_KEY);

            req.token = token;
            req.customer = await CustomerCollection.findOne({ customer_email: emailObj._id });
            
            next();

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(301).redirect("/login");
            }
            return res.status(401).send(error);
        }
    },
    notLoggedIn: async (req, res, next) => {
        try {
            let token = req.cookies.loginCookie;
            jwt.verify(token, process.env.SECRET_KEY);
            return res.status(301).redirect("/");

        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(200).render("login");
            }
            return res.status(401).send(error);
        }
    }
};