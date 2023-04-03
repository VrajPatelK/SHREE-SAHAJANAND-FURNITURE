const express = require('express');
const router = express.Router();

//controllers
const {
    displayOrders,
    getAllOrders,
    deliverOrder,
    deliverOrderUncheck

} = require("../../../Controllers/Trading-Controllers/order-controllers");


const { isAdmin,isAccountant } = require('../../Middlewares/isLogin'); // isAccountant

router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "accountant") { isAccountant(req, res, next); }
});

router.get("/orders", displayOrders);
router.get('/get-all-orders', getAllOrders);
router.post('/deliver-order', deliverOrder);
router.post('/deliver-order-uncheck', deliverOrderUncheck);

module.exports = router;