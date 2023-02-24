const express = require('express');
const router = express.Router();


//controllers
const {
    createShoerack,
    getShoeracks,
    updateShoerackGet,
    updateShoerackPost,
    deleteShoerack

} = require("../../../Controllers/Product-Controllers/shoerack-cntrl");


router.post("/admin/product/shoeracks", createShoerack);
router.get("/admin/product/shoeracks", getShoeracks);
router.get("/admin/product/edit-shoerack", updateShoerackGet);
router.post("/admin/product/edit-shoerack", updateShoerackPost);
router.get("/admin/product/delete-shoerack", deleteShoerack);


module.exports = router;