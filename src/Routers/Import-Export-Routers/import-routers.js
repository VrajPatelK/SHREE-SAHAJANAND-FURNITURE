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


router.post("/admin/imports", createImport);
router.get("/admin/imports", getImports);
router.get("/admin/edit-import", updateImportGet);
router.post("/admin/edit-import", updateImportPost);
router.get("/admin/delete-import", deleteImport);

module.exports = router;