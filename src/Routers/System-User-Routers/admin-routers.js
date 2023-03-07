const express = require('express');
const router = express.Router();


//controllers
const {
    getAdmins,
    updateAdminGet,
    updateAdminPost,
    deleteAdmin

} = require("../../../Controllers/System-User-Controllers/admin-cntrl");

router.get("/admin/admins", getAdmins);
router.get("/admin/edit-admin", updateAdminGet);
router.post("/admin/edit-admin", updateAdminPost);
router.get("/admin/delete-admin", deleteAdmin);

module.exports = router;