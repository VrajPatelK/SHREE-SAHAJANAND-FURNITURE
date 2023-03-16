const express = require('express');
const router = express.Router();

//controllers
const {
    getProduct,

} = require('../../../Controllers/Product-Controllers/product-read-cntrl');

router.get("/product/:category", getProduct);

module.exports = router;