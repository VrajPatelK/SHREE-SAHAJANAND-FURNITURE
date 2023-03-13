const express = require('express');
const router = express.Router();


//controllers
const {
    createBed,
    getBeds,
    updateBedGet,
    updateBedPost,
    deleteBed

} = require("../../../Controllers/Product-Controllers/bed-cntrl");

const { isAdmin, isCustomer } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin')
        isAdmin(req, res, next);
    else if (res.locals.session.userType === 'customer')
        isCustomer(req, res, next);
});

router.post("/admin/product/beds", createBed);
router.get("/admin/product/beds", getBeds);
router.get("/admin/product/edit-bed", updateBedGet);
router.post("/admin/product/edit-bed", updateBedPost);
router.get("/admin/product/delete-bed", deleteBed);


module.exports = router;