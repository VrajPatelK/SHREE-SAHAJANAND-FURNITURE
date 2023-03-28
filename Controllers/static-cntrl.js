//helpers
const { getAllFileNames } = require('../src/Helpers/other-helpers');

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
            res.status(201).render("contact");


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