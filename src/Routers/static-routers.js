const express = require('express');
const router = express.Router();
const { isLogin, notLoggedIn } = require("../Middlewares/login-auth");

//controllers
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    getLoginPage,
    doLogout

} = require("../../Controllers/static-cntrl");

router.get("/", isLogin, getIndexPage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.get("/login", notLoggedIn, getLoginPage);
router.get("/logout", isLogin, doLogout);


module.exports = router;