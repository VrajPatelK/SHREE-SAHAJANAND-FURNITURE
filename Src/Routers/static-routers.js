const express = require('express');
const router = express.Router();

//controllers
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    postContactPage,
    getLandingPage,
    createSubscriber
} = require("../../Controllers/static-cntrl");


router.get("/", getLandingPage);
router.get("/home", getIndexPage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.post("/contact", postContactPage);
router.post("/subscribe", createSubscriber);


module.exports = router;