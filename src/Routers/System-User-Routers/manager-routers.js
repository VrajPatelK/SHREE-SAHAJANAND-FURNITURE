const express = require('express');
const router = express.Router();



//controllers
const {
    createManager,
    getManagers,
    updateManagerGet,
    updateManagerPost,
    deleteManager

} = require("../../../Controllers/System-User-Controllers/manager-cntrl");

router.post("/admin/managers", createManager);
router.get("/admin/managers", getManagers);
router.get("/admin/edit-manager", updateManagerGet);
router.post("/admin/edit-manager", updateManagerPost);
router.get("/admin/delete-manager", deleteManager);

module.exports = router;