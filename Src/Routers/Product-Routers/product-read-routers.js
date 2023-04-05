const express = require('express');
const router = express.Router();

//controllers
const {
    getProduct,
    getProductByFilter,
    displayProducts

} = require('../../../Controllers/Product-Controllers/product-read-cntrl');

const { isAdmin, isCustomer, isManager } = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else if (res.locals.session.userType === 'customer') { isCustomer(req, res, next); }
    else { return res.status(404).render("errorpage/error-page-404"); }

});

router.get("/product/:category/:pid", getProduct);
router.get("/product/:category", displayProducts);
router.post("/filter-products", getProductByFilter);

module.exports = router;