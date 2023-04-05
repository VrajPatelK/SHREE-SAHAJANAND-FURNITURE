const express = require('express');
const router = express.Router();


//controllers
const {
    createExport,
    getExports,
    updateExportGet,
    updateExportPost,
    deleteExport

} = require("../../../Controllers/Import-Export-Controllers/export-cntrl");

const { isAdmin, isManager } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "manager") { isManager(req, res, next); }
    else return res.status(404).render("errorpage/error-page-404");
});

router.post("/admin/exports", createExport);
router.get("/admin/exports", getExports);
router.get("/admin/edit-export", updateExportGet);
router.post("/admin/edit-export", updateExportPost);
router.get("/admin/delete-export", deleteExport);

module.exports = router;