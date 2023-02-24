const express = require('express');
const router = express.Router();


//controllers
const {
    createMattresses,
    getMattressess,
    updateMattressesGet,
    updateMattressesPost,
    deleteMattresses

} = require("../../../Controllers/Product-Controllers/mattresse-cntrl");


router.post("/admin/product/mattresses", createMattresses);
router.get("/admin/product/mattresses", getMattressess);
router.get("/admin/product/edit-mattresses", updateMattressesGet);
router.post("/admin/product/edit-mattresses", updateMattressesPost);
router.get("/admin/product/delete-mattresses", deleteMattresses);


module.exports = router;