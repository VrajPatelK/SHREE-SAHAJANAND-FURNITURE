const express = require('express');
const router = express.Router();


//controllers
const {
    createJula,
    getJulas,
    updateJulaGet,
    updateJulaPost,
    deleteJula

} = require("../../../Controllers/Product-Controllers/jula-cntrl");


router.post("/admin/product/julas", createJula);
router.get("/admin/product/julas", getJulas);
router.get("/admin/product/edit-jula", updateJulaGet);
router.post("/admin/product/edit-jula", updateJulaPost);
router.get("/admin/product/delete-jula", deleteJula);


module.exports = router;