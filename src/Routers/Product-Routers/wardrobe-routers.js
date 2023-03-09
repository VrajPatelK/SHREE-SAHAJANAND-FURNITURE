const express = require('express');
const router = express.Router();


//controllers
const {
    createWardrobe,
    getWardrobes,
    updateWardrobeGet,
    updateWardrobePost,
    deleteWardrobe

} = require("../../../Controllers/Product-Controllers/wardrobe-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/product/wardrobes", createWardrobe);
router.get("/admin/product/wardrobes", getWardrobes);
router.get("/admin/product/edit-wardrobe", updateWardrobeGet);
router.post("/admin/product/edit-wardrobe", updateWardrobePost);
router.get("/admin/product/delete-wardrobe", deleteWardrobe);


module.exports = router;