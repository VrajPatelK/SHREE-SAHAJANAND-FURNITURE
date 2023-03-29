//helpers
const { getAllFileNames } = require('../src/Helpers/other-helpers');
const ContactCollection = require('../Src/Models/customers/contact-schema');
const SubscriberCollection = require('../Src/Models/customers/subscriber-schema');

module.exports = {

    getIndexPage: async (req, res) => {

        try {
            res.status(201).render("home", {

                // admin: req.session.isAdmin,
                exploreImg: getAllFileNames("explore"),
                trendingImg: getAllFileNames("trending"),
                sellerImg: getAllFileNames("seller"),
                reviewImg: getAllFileNames("review")
            });

        } catch (error) {
            console.log(error);
        }
    },

    getAboutPage: async (req, res) => {
        try {
            res.status(201).render("about", {

                // admin: req.session.isAdmin,
                qualityImg: getAllFileNames("quality")
            });

        } catch (error) {
            console.log(error);
        }
    },

    getContactPage: async (req, res) => {
        try {

            // res.status(201).render("contact", { admin: req.session.isAdmin });
            res.status(201).render("contact", { msg: undefined });


        } catch (error) {
            console.log(error);
        }
    },

    postContactPage: async (req, res) => {
        try {

            let name = req.body.contact_name;
            let email = req.body.contact_email;
            let mobile = req.body.contact_mobile;
            let msg = req.body.contact_msg;

            await ContactCollection.create({ name, email, mobile, msg });

            res.status(201).render("contact", {
                msg: "Message sent Succussfully..."
            });
        } catch (error) {
            console.log(error);
        }
    },

    createSubscriber: async (req, res) => {
        try {

            await SubscriberCollection.create({ email: req.body.email });
            return res.status(200).end();

        } catch (error) {
            console.log(error);
        }
    },

    getLandingPage: async (req, res) => {

        try {
            res.status(201).render("index");
        } catch (error) {
            console.log(error);
        }
    },
};