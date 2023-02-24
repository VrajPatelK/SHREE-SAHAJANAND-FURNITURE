//helpers
const { getAllFileNames } = require('../src/Helpers/other-helpers');
const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

module.exports = {

    getIndexPage: async (req, res) => {

        try {
            res.status(201).render("index", {

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

        } catch (error) {
            console.log(error);
        }
    },
    getLoginPage: async (req, res) => {
        try {
            res.status(200).render("login");

        } catch (error) {
            res.status(401).send(error);
        }
    },
    doLogout: async (req, res) => {
        try {

            let remainTokens = req.customer.loginTokens.filter((token) => {
                token !== req.token
            });

            res.clearCookie("loginCookie");
            req.customer.loginTokens = remainTokens;

            req.customer.save();
            return res.status(301).redirect("/login");

        } catch (error) {
            res.status(401).send(error);
        }
    }
};