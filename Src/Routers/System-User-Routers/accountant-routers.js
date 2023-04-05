const express = require('express');
const router = express.Router();

//controllers
const {
    getCreateAccountant,
    postCreateAccountant,
    getAccountants,
    updateAccountantGet,
    updateAccountantPost,
    deleteAccountant

} = require("../../../Controllers/System-User-Controllers/accountant-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) { return res.status(404).render("errorpage/error-page-404"); });

router.get("/admin/create-accountant", getCreateAccountant);
router.post("/admin/create-accountant", postCreateAccountant);
router.get("/admin/accountants", getAccountants);
router.get("/admin/edit-accountant", updateAccountantGet);
router.post("/admin/edit-accountant", updateAccountantPost);
router.get("/admin/delete-accountant", deleteAccountant);


module.exports = router;