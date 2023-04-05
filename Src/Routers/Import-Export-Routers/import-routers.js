const express = require('express');
const router = express.Router();


//controllers
const {
    createImport,
    getImports,
    updateImportGet,
    updateImportPost,
    deleteImport

} = require("../../../Controllers/Import-Export-Controllers/import-cntrl");

const { isAdmin, isManager } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {

    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else if (res.locals.session.userType === "manager") { isManager(req, res, next); }
    else return res.status(404).render("errorpage/error-page-404");
});

router.post("/admin/imports", createImport);
router.get("/admin/imports", getImports);
router.get("/admin/edit-import", updateImportGet);
router.post("/admin/edit-import", updateImportPost);
router.get("/admin/delete-import", deleteImport);

module.exports = router;