const express = require('express');
const router = express.Router();

//controllers
const {
    createAccountant,
    getAccountants,
    updateAccountantGet,
    updateAccountantPost,
    deleteAccountant

} = require("../../../Controllers/System-User-Controllers/accountant-cntrl");


router.post("/admin/accountants", createAccountant);
router.get("/admin/accountants", getAccountants);
router.get("/admin/edit-accountant", updateAccountantGet);
router.post("/admin/edit-accountant", updateAccountantPost);
router.get("/admin/delete-accountant", deleteAccountant);


module.exports = router;