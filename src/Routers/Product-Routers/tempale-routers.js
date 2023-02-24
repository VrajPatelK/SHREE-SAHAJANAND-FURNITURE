const express = require('express');
const router = express.Router();


//controllers
const {
    createTempale,
    getTempales,
    updateTempaleGet,
    updateTempalePost,
    deleteTempale

} = require("../../../Controllers/Product-Controllers/tempale-cntrl");


router.post("/admin/product/tempales", createTempale);
router.get("/admin/product/tempales", getTempales);
router.get("/admin/product/edit-tempale", updateTempaleGet);
router.post("/admin/product/edit-tempale", updateTempalePost);
router.get("/admin/product/delete-tempale", deleteTempale);


module.exports = router;