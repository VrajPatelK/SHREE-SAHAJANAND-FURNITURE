const express = require('express');
const router = express.Router();


//controllers
const {
    createFavourite,
    removeFavourite,
    getFavouriteByCustomer
} = require("../../../Controllers/Customer-Controllers/purchase-cntrl");


router.get('/add-to-fav', createFavourite);
router.get('/rmv-to-fav', removeFavourite);
router.get('/get-favourites/:cid', getFavouriteByCustomer);

module.exports = router;