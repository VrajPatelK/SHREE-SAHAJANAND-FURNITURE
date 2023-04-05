const { sendMail } = require("../../Src/Helpers/mail");
const { makeid } = require("../../Src/Helpers/other-helpers");
const CustomerCollection = require("../../src/Models/customers/customer-schema");
const Bcrypt = require("bcryptjs");

module.exports = {
    getCreateCustomer: async (req, res) => {
        try {

            return res.status(200).render("customer/customer-register", { swr: false });
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    postCreateCustomer: async (req, res) => {
        try {

            let customer = await CustomerCollection.findOne({ email: req.body.email });
            if (customer !== null) {
                return res.status(200).render("customer/customer-register", {
                    swr: true,
                    em: "Customer already exist with this email-id",
                    result: req.body
                });
            }

            customer = await CustomerCollection.findOne({ mobile: req.body.mobile });
            if (customer !== null) {
                return res.status(200).render("customer/customer-register", {
                    swr: true,
                    em: "Customer already exist with this mobile",
                    result: req.body
                });
            }

            req.body.pass = Bcrypt.hashSync(req.body.pass); console.log(req.body.image);
            customer = await CustomerCollection.create(req.body);
            return res.status(301).redirect("/customer-login");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getCustomer: async (req, res) => {
        try {
            let customer = await CustomerCollection.findOne({
                $or: [
                    { _id: res.locals.session.user._id },
                    { email: req.body.email },
                    { mobile: req.body.mobile },
                ]
            });

            if (customer === null)
                return res.status(404).json({ error: "account doesn't exist" });

            return res.status(200).render("customer/customer-profile", {
                result: customer
            });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getUpdateCustomer: async (req, res) => {
        try {

            let target_id = res.locals.session.user._id.toString();

            if (target_id !== undefined) {
                let customer = await CustomerCollection.findOne({ _id: target_id });
                return res.status(201).render("customer/customer-edit", { result: customer, swr: false });
            }

            return res.status(404).render("errorpage/error-page-404");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    postUpdateCustomer: async (req, res) => {
        try {

            let cid = res.locals.session.user._id.toString();

            let customer = await CustomerCollection.findOne({ email: req.body.email });
            if (customer !== null && customer._id.toString() !== cid)
                return res.status(200).render("customer/customer-edit", {
                    result: req.body,
                    swr: true,
                    errorMsg: "Customer is already with this Email-Id..."
                });

            customer = await CustomerCollection.findOne({ mobile: req.body.mobile });
            if (customer !== null && customer._id.toString() !== cid)
                return res.status(200).render("customer/customer-edit", {
                    result: req.body,
                    swr: true,
                    errorMsg: "Customer is already with this Mobile number..."
                });

            customer = req.body;
            if (req.body.rmvImage)
                customer.image = "";

            await CustomerCollection.updateOne(
                { _id: cid },
                { $set: customer }
            );

            return res.status(301).redirect("/customer-profile");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deleteCustomer: async (req, res) => {
        try {

            let target_id = res.locals.session.user._id.toString();

            if (target_id !== undefined) {
                res.clearCookie("loginCustomer");
                await CustomerCollection.deleteOne({ _id: target_id });
            }

            return res.status(301).redirect("/customer-register");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getLoginCustomer: async (req, res) => {
        try {

            return res.status(200).render("index", { swr: false });
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    postLoginCustomer: async (req, res) => {
        try {

            let customer = await CustomerCollection.findOne({ email: req.body.email });

            if (customer === null) {
                return res.status(200).render("index", {
                    swr: true,
                    em: "account doesn't exist.Need to register",
                    result: req.body
                });
            }

            if (!Bcrypt.compareSync(req.body.pass, customer.pass)) {
                return res.status(200).render("index", {
                    swr: true,
                    em: "email/password is wrong",
                    result: req.body
                });
            }

            let token = await customer.createToken();
            res.cookie("loginCustomer", token, { httpOnly: true });
            await customer.save();

            res.locals.session.userType = "customer";
            res.locals.session.user = customer;

            return res.status(301).redirect("/customer-profile");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    logoutCustomer: async (req, res) => {
        try {

            let remains = req.customer.loginTokens.filter((currentToken) => {
                return currentToken.token !== req.token
            });

            req.customer.loginTokens = remains;
            await req.customer.save();

            res.clearCookie("loginCustomer");
            res.locals.session = null;
            return res.status(301).redirect("/customer-login");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    SendMailGet: async (req, res) => {
        try {
            return res.render("customer/send-mail", { msg: [undefined] });
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    SendMailPost: async (req, res) => {
        try {
            let email = req.body.email;

            let customer = await CustomerCollection.findOne({ email: email });
            if (customer === null)
                return res.render("customer/send-mail", { msg: [404, "Email id doesn't exist"], email });

            // sendmail
            let mid = await makeid(23);

            sendMail(customer.email, customer.id, mid)
                .then(result => {
                    return res.render("customer/send-mail", { msg: [201, `Email-sent.... on ${email}`], email });
                })
                .catch((error) => console.log(error.message));


        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    changePasswordGet: async (req, res) => {
        try {
            return res.render("customer/reset-pass");
        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    changePasswordPost: async (req, res) => {
        try {
            let id = req.body.path.split("/")[2];
            let pass = req.body.pass;

            let customer = await CustomerCollection.findById(id);
            customer.pass = Bcrypt.hashSync(pass);
            await customer.save();
            return res.json({ msg: "Password is updated successfully !!!" });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    }
}