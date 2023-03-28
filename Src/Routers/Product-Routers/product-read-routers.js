const express = require('express');
const router = express.Router();

//controllers
const {
    getProduct,
    getProductByFilter,
    getAllProducts

} = require('../../../Controllers/Product-Controllers/product-read-cntrl');

const { isAdmin, isCustomer, isManager } = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else if (res.locals.session.userType === 'customer') { isCustomer(req, res, next); }
});

router.get("/product/:category", getProduct);
router.get("/product", getAllProducts);
router.post("/filter-products", getProductByFilter);

module.exports = router;