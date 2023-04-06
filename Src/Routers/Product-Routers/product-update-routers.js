const express = require('express');
const router = express.Router();

//controllers
const {
    updateProductGet,

    updateBedPost,
    updateChairPost,
    updateJulaPost,
    updateMattressesPost,
    updateShoerackPost,
    updateShowcasePost,
    updateSofaPost,
    updateTablePost,
    updateTempalePost,
    updateTvUnitPost,
    updateWardrobePost

} = require('../../../Controllers/Product-Controllers/product-update-cntrl');

const { isAdmin, isManager } = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else { return res.status(404).render("errorpage/error-page-404"); }
});

router.get("/product/:category/edit/:pid", updateProductGet);

router.post("/product/bed/edit/:pid", updateBedPost);
router.post("/product/chair/edit/:pid", updateChairPost);
router.post("/product/jula/edit/:pid", updateJulaPost);
router.post("/product/mattresse/edit/:pid", updateMattressesPost);
router.post("/product/shoerack/edit/:pid", updateShoerackPost);
router.post("/product/showcase/edit/:pid", updateShowcasePost);
router.post("/product/sofa/edit/:pid", updateSofaPost);
router.post("/product/table/edit/:pid", updateTablePost);
router.post("/product/tempale/edit/:pid", updateTempalePost);
router.post("/product/tvunit/edit/:pid", updateTvUnitPost);
router.post("/product/wardrobe/edit/:pid", updateWardrobePost);

module.exports = router;