const express = require('express');
const router = express.Router();


//controllers
const {
    systemUserRequest,

} = require("../../Controllers/request-manager-cntrl");

router.get("/admin/manage", systemUserRequest);

module.exports = router;