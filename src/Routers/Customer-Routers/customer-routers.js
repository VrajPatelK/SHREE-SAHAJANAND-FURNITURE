const express = require('express');
const router = express.Router();

//controllers
const {
    getCreateCustomer,
    postCreateCustomer,
    getLoginCustomer,
    postLoginCustomer,
    getCustomer,
    logoutCustomer,
    deleteCustomer

} = require("../../../Controllers/Customer-Controllers/customer-cntrl");

const { isCustomer, customerNotLoggedIn } = require('../../Middlewares/isLogin');

router.get("/customer-register", customerNotLoggedIn, getCreateCustomer);
router.post("/customer-register", postCreateCustomer);
router.get("/customer-login", customerNotLoggedIn, getLoginCustomer);
router.post("/customer-login", postLoginCustomer);

router.get("/customer-profile/:id", isCustomer, getCustomer);
router.get("/customer-logout/:id", isCustomer, logoutCustomer);
router.get("/customer-delete", isCustomer, deleteCustomer);

module.exports = router;