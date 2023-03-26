const express = require('express');
const router = express.Router();


//controllers
const {
    getLoginSystemUser,
    postLoginSystemUser,
    logoutSystemUser

} = require("../../../Controllers/System-User-Controllers/system-user-login-cntrl");

const { isAdmin, isManager, isCustomer } = require('../../Middlewares/isLogin');


router.get("/sys-user/login", getLoginSystemUser);
router.post("/sys-user/login", postLoginSystemUser);

router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin') { isAdmin(req, res, next); }
    else if (res.locals.session.userType === 'manager') { isManager(req, res, next); }
    // else if (res.locals.session.userType === 'accountant') { isAccountant(req, res, next); }
    else if (res.locals.session.userType === 'customer') {
        isCustomer(req, res, next);
        return res.status(301).redirect("/customer-profile");
    }

});

router.get("/sys-user/logout", logoutSystemUser);


module.exports = router;