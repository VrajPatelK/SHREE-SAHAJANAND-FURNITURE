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


router.post("/admin/product/wardrobes", createWardrobe);
router.get("/admin/product/wardrobes", getWardrobes);
router.get("/admin/product/edit-wardrobe", updateWardrobeGet);
router.post("/admin/product/edit-wardrobe", updateWardrobePost);
router.get("/admin/product/delete-wardrobe", deleteWardrobe);


module.exports = router;