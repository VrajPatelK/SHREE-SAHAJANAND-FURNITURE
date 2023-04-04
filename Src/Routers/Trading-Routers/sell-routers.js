const express = require('express');
const router = express.Router();

//controllers
const {
    displaySells,
    getAllSells
} = require("../../../Controllers/sells-cntrl");

const {
    isAdmin,
    isManager,
    isAccountant

} = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "manager") { isManager(req, res, next); }
    else if (res.locals.session.userType === "accountant") { isAccountant(req, res, next); }
    else { isAdmin(req, res, next); }

});

router.get("/sells", displaySells);
router.get("/all-sells", getAllSells);

module.exports = router;