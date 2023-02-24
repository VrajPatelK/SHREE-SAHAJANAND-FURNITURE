const express = require('express');
const router = express.Router();


//controllers
const {
    createTvUnit,
    getTvUnits,
    updateTvUnitGet,
    updateTvUnitPost,
    deleteTvUnit

} = require("../../../Controllers/Product-Controllers/tvunit-cntrl");


router.post("/admin/product/tvunits", createTvUnit);
router.get("/admin/product/tvunits", getTvUnits);
router.get("/admin/product/edit-tvunit", updateTvUnitGet);
router.post("/admin/product/edit-tvunit", updateTvUnitPost);
router.get("/admin/product/delete-tvunit", deleteTvUnit);


module.exports = router;