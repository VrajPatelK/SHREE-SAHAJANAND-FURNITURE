const express = require('express');
const router = express.Router();


//controllers
const {
    getLoginSystemUser,
    postLoginSystemUser,
    logoutSystemUser,

    getSystemUser

} = require("../../../Controllers/System-User-Controllers/system-user-login-cntrl");

const { isAdmin, isManager, isAccountant, isCustomer } = require('../../Middlewares/isLogin');


router.get("/sys-user/login", getLoginSystemUser);
router.post("/sys-user/login", postLoginSystemUser);

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    else if (res.locals.session.userType === 'accountant') { isAccountant(req, res, next); }
    else { isCustomer(req, res, next); }

});

router.get("/sys-user/logout", logoutSystemUser);
router.get("/sys-user-profile", getSystemUser);

module.exports = router;