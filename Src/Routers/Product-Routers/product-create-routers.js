const express = require('express');
const router = express.Router();

//controllers
const {
    createBed,
    createChair,
    createJula,
    createMattresses,
    createShoerack,
    createShowcase,
    createSofa,
    createTable,
    createTempale,
    createTvUnit,
    createWardrobe

} = require('../../../Controllers/Product-Controllers/product-create-cntrl');

const { isAdmin, isManager } = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else { return res.status(404).render("errorpage/error-page-404"); }
});

router.post("/product/bed", createBed);
router.post("/product/chair", createChair);
router.post("/product/jula", createJula);
router.post("/product/mattresse", createMattresses);
router.post("/product/shoerack", createShoerack);
router.post("/product/showcase", createShowcase);
router.post("/product/sofa", createSofa);
router.post("/product/table", createTable);
router.post("/product/tempale", createTempale);
router.post("/product/tvunit", createTvUnit);
router.post("/product/wardrobe", createWardrobe);

module.exports = router;