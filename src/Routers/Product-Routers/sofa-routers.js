const express = require('express');
const router = express.Router();


//controllers
const {
    createSofa,
    getSofas,
    updateSofaGet,
    updateSofaPost,
    deleteSofa

} = require("../../../Controllers/Product-Controllers/sofa-cntrl");

const { isAdmin, isCustomer } = require('../../Middlewares/isLogin');


router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { console.log("admin"); isAdmin(req, res, next); }
    isCustomer(req, res, next);
});
// router.get("/admin/product/sofas", isCustomer, getSofas);
router.get("/admin/product/:category", isCustomer, getSofas);

router.use(function (req, res, next) { isAdmin(req, res, next); });
router.post("/admin/product/sofas", createSofa);
router.get("/admin/product/edit-sofa", updateSofaGet);
router.post("/admin/product/edit-sofa", updateSofaPost);
router.get("/admin/product/delete-sofa", deleteSofa);


module.exports = router;