const express = require('express');
const router = express.Router();


//controllers
const {
    createChair,
    getChairs,
    updateChairGet,
    updateChairPost,
    deleteChair

} = require("../../../Controllers/Product-Controllers/chair-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/product/chairs", createChair);
router.get("/admin/product/chairs", getChairs);
router.get("/admin/product/edit-chair", updateChairGet);
router.post("/admin/product/edit-chair", updateChairPost);
router.get("/admin/product/delete-chair", deleteChair);


module.exports = router;