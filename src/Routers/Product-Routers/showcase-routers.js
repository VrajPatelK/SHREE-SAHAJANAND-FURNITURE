const express = require('express');
const router = express.Router();


//controllers
const {
    createShowcase,
    getShowcases,
    updateShowcaseGet,
    updateShowcasePost,
    deleteShowcase

} = require("../../../Controllers/Product-Controllers/showcase-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/product/showcases", createShowcase);
router.get("/admin/product/showcases", getShowcases);
router.get("/admin/product/edit-showcase", updateShowcaseGet);
router.post("/admin/product/edit-showcase", updateShowcasePost);
router.get("/admin/product/delete-showcase", deleteShowcase);


module.exports = router;