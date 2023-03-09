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

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/product/sofas", createSofa);
router.get("/admin/product/sofas", getSofas);
router.get("/admin/product/edit-sofa", updateSofaGet);
router.post("/admin/product/edit-sofa", updateSofaPost);
router.get("/admin/product/delete-sofa", deleteSofa);


module.exports = router;