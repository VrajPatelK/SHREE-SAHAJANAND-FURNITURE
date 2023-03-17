const express = require('express');
const router = express.Router();

//controllers
const {
    deleteProduct

} = require('../../../Controllers/Product-Controllers/product-delete-cntrl');

router.get("/product/:category/delete/:pid", deleteProduct);

module.exports = router;