const express = require('express');
const router = express.Router();

//controllers
const {
    createManufacturer,
    getManufacturers,
    updateManufacturerGet,
    updateManufacturerPost,
    deleteManufacturer

} = require("../../../Controllers/System-User-Controllers/manufacturer-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { return res.status(404).render("errorpage/error-page-404"); });

router.post("/admin/manufacturers", createManufacturer);
router.get("/admin/manufacturers", getManufacturers);
router.get("/admin/edit-manufacturer", updateManufacturerGet);
router.post("/admin/edit-manufacturer", updateManufacturerPost);
router.get("/admin/delete-manufacturer", deleteManufacturer);


module.exports = router;