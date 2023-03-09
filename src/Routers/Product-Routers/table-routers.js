const express = require('express');
const router = express.Router();


//controllers
const {
    createTable,
    getTables,
    updateTableGet,
    updateTablePost,
    deleteTable

} = require("../../../Controllers/Product-Controllers/table-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { isAdmin(req, res, next); });

router.post("/admin/product/tables", createTable);
router.get("/admin/product/tables", getTables);
router.get("/admin/product/edit-table", updateTableGet);
router.post("/admin/product/edit-table", updateTablePost);
router.get("/admin/product/delete-table", deleteTable);


module.exports = router;