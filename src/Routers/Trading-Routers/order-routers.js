const express = require('express');
const router = express.Router();

//controllers
const {
    getAllOrders
} = require("../../../Controllers/Trading-Controllers/order-controllers");


const { isAdmin } = require('../../Middlewares/isLogin'); // isAccountant

router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "accountant") { isAccountant(req, res, next); }
});

router.get("/admin/orders", getAllOrders);

module.exports = router;