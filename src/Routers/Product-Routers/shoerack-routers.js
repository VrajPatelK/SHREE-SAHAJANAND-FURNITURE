const express = require('express');
const router = express.Router();


//controllers
const {
    createShoerack,
    getShoeracks,
    updateShoerackGet,
    updateShoerackPost,
    deleteShoerack

} = require("../../../Controllers/Product-Controllers/shoerack-cntrl");

const { isAdmin, isCustomer } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {
    if (res.locals.session.userType === 'admin')
        isAdmin(req, res, next);
    else if (res.locals.session.userType === 'customer')
        isCustomer(req, res, next);
});

router.post("/admin/product/shoeracks", createShoerack);
router.get("/admin/product/shoeracks", getShoeracks);
router.get("/admin/product/edit-shoerack", updateShoerackGet);
router.post("/admin/product/edit-shoerack", updateShoerackPost);
router.get("/admin/product/delete-shoerack", deleteShoerack);


module.exports = router;