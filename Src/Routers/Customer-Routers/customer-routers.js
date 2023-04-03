const express = require('express');
const router = express.Router();

//controllers
const {
    getCreateCustomer,
    postCreateCustomer,
    getLoginCustomer,
    postLoginCustomer,
    getCustomer,
    getUpdateCustomer,
    postUpdateCustomer,
    logoutCustomer,
    deleteCustomer,

    SendMailGet,
    SendMailPost,
    changePasswordGet,
    changePasswordPost

} = require("../../../Controllers/Customer-Controllers/customer-cntrl");

const { isCustomer, customerNotLoggedIn } = require('../../Middlewares/isLogin');

router.get("/customer-register", customerNotLoggedIn, getCreateCustomer);
router.post("/customer-register", postCreateCustomer);

router.get("/customer-login", customerNotLoggedIn, getLoginCustomer);
router.post("/customer-login", postLoginCustomer);

router.get("/customer-profile", isCustomer, getCustomer);
router.get("/customer-profile/edit", isCustomer, getUpdateCustomer);
router.post("/customer-profile/edit", isCustomer, postUpdateCustomer);
router.get("/customer-logout", isCustomer, logoutCustomer);
router.get("/customer-delete", isCustomer, deleteCustomer);

router.get("/send-mail", SendMailGet);
router.post("/send-mail", SendMailPost);
router.get("/reset-password/:id/:makeid", changePasswordGet);
router.post("/reset-password", changePasswordPost);

module.exports = router;