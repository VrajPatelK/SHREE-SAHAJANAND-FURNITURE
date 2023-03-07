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


router.get("/admin/create-accountant", getCreateAccountant);
router.post("/admin/create-accountant", postCreateAccountant);
router.get("/admin/accountants", getAccountants);
router.get("/admin/edit-accountant", updateAccountantGet);
router.post("/admin/edit-accountant", updateAccountantPost);
router.get("/admin/delete-accountant", deleteAccountant);


module.exports = router;