const express = require('express');
const router = express.Router();


//controllers
const {
    createVendor,
    getVendors,
    updateVendorGet,
    updateVendorPost,
    deleteVendor

} = require("../../../Controllers/System-User-Controllers/vendor-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/vendors", createVendor);
router.get("/admin/vendors", getVendors);
router.get("/admin/edit-vendor", updateVendorGet);
router.post("/admin/edit-vendor", updateVendorPost);
router.get("/admin/delete-vendor", deleteVendor);


module.exports = router;