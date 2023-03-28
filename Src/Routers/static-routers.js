const express = require('express');
const router = express.Router();

//controllers
const {
    getIndexPage,
    getAboutPage,
    getContactPage,

} = require("../../Controllers/static-cntrl");


router.get("/", getIndexPage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);


module.exports = router;