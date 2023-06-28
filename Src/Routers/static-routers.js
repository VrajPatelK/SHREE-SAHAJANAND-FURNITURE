const express = require('express');
const router = express.Router();

//controllers
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    postContactPage,
    createSubscriber
} = require("../../Controllers/static-cntrl");

const { isCustomer } = require('../Middlewares/isLogin');

router.get("/", getIndexPage);

router.use(function (req, res, next) {
    isCustomer(req, res, next);
});

router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.post("/contact", postContactPage);
router.post("/subscribe", createSubscriber);


module.exports = router;