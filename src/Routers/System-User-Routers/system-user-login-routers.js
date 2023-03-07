const express = require('express');
const router = express.Router();


//controllers
const {
    getLoginSystemUser,
    postLoginSystemUser,

} = require("../../../Controllers/System-User-Controllers/system-user-login-cntrl");

router.get("/sys-user/login", getLoginSystemUser);
router.post("/sys-user/login", postLoginSystemUser);

module.exports = router;