const express = require('express');
const router = express.Router();



//controllers
const {
    getCreateManager,
    postCreateManager,
    getManagers,
    updateManagerGet,
    updateManagerPost,
    deleteManager

} = require("../../../Controllers/System-User-Controllers/manager-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.get("/admin/create-manager", getCreateManager);
router.post("/admin/create-manager", postCreateManager);
router.get("/admin/managers", getManagers);
router.get("/admin/edit-manager", updateManagerGet);
router.post("/admin/edit-manager", updateManagerPost);
router.get("/admin/delete-manager", deleteManager);

module.exports = router;