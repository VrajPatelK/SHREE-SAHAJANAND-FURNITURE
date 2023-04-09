const express = require('express');
const router = express.Router();


//controllers
const {
    getAdmins,
    updateAdminGet,
    updateAdminPost,
    deleteAdmin

} = require("../../../Controllers/System-User-Controllers/admin-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {
    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else return res.status(404).render("errorpage/error-page-404");
});

router.get("/admin/admins", getAdmins);
router.get("/admin/edit-admin", updateAdminGet);
router.post("/admin/edit-admin", updateAdminPost);
router.get("/admin/delete-admin", deleteAdmin);

module.exports = router;