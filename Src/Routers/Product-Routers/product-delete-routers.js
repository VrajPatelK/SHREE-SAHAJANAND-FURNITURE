const express = require('express');
const router = express.Router();

//controllers
const {
    deleteProduct

} = require('../../../Controllers/Product-Controllers/product-delete-cntrl');

const { isAdmin, isManager } = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else { return res.status(404).render("errorpage/error-page-404"); }
});

router.get("/product/:category/delete/:pid", deleteProduct);

module.exports = router;