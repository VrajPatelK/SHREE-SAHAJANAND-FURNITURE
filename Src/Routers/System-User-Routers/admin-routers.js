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
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.get("/admin/admins", getAdmins);
router.get("/admin/edit-admin", updateAdminGet);
router.post("/admin/edit-admin", updateAdminPost);
router.get("/admin/delete-admin", deleteAdmin);

module.exports = router;