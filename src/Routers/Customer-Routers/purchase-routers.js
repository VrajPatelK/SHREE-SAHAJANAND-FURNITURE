const express = require('express');
const router = express.Router();


//controllers
const {
    createFavourite,
    removeFavourite,
    getFavouriteByCustomer,
    createCart,
    removeCart,
    getCartByCustomer,

} = require("../../../Controllers/Customer-Controllers/purchase-cntrl");


router.post('/add-to-fav', createFavourite);
router.post('/rmv-to-fav', removeFavourite);
router.get('/get-favourites/:cid', getFavouriteByCustomer);

router.get('/add-to-cart', createCart);
router.get('/rmv-to-cart', removeCart);
router.get('/get-carts/:cid', getCartByCustomer);

module.exports = router;