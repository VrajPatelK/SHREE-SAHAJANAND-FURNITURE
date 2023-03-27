const express = require('express');
const router = express.Router();

//controllers
const {
    getAllSells
} = require("../../../Controllers/sells-controllers");

const {
    isAdmin,
    isManager,
    isAccountant

} = require('../../Middlewares/isLogin');

router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "manager") { isManager(req, res, next); }
    else if (res.locals.session.userType === "accountant") { isAccountant(req, res, next); }
});

router.get("/admin/sells", getAllSells);

module.exports = router;