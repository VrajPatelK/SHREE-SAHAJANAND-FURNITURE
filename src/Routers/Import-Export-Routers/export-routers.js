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


router.post("/admin/exports", createExport);
router.get("/admin/exports", getExports);
router.get("/admin/edit-export", updateExportGet);
router.post("/admin/edit-export", updateExportPost);
router.get("/admin/delete-export", deleteExport);

module.exports = router;