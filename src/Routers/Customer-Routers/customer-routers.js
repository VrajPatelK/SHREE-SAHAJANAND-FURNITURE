const express = require('express');
const router = express.Router();

//controllers
const {
    createCustomer
    
} = require("../../../Controllers/customer-cntrl");

router.post("/create-customer", createCustomer);

module.exports = router;