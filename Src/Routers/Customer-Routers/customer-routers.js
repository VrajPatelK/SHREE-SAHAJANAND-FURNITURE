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
    deleteCustomer

} = require("../../../Controllers/Customer-Controllers/customer-cntrl");

const { isCustomer, customerNotLoggedIn } = require('../../Middlewares/isLogin');

router.get("/customer-register", customerNotLoggedIn, getCreateCustomer);
router.post("/customer-register", postCreateCustomer);
router.get("/", customerNotLoggedIn, getLoginCustomer);
router.post("/", postLoginCustomer);

router.get("/customer-profile", isCustomer, getCustomer);
router.get("/customer-profile/edit", isCustomer, getUpdateCustomer);
router.post("/customer-profile/edit", isCustomer, postUpdateCustomer);
router.get("/customer-logout", isCustomer, logoutCustomer);
router.get("/customer-delete", isCustomer, deleteCustomer);

module.exports = router;