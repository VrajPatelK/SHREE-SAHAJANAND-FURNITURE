const express = require('express');
const router = express.Router();


//controllers
const {
    createFavourite,
    removeFavourite,
    getFavouriteByCustomer,
    displayFavourites,

    createCart,
    removeCart,
    getCartsByCustomer,
    updateCart,
    displayCarts,

    createOrder,
    getOrdersByCustomer,
    displayOrders,

} = require("../../../Controllers/Customer-Controllers/purchase-cntrl");


router.post('/add-to-fav', createFavourite);
router.post('/rmv-to-fav', removeFavourite);
router.get('/get-favourites', getFavouriteByCustomer);
router.get('/favourites', displayFavourites);

router.post('/add-to-cart', createCart);
router.get('/get-carts', getCartsByCustomer);
router.post('/rmv-to-cart', removeCart);
router.post('/update-cart', updateCart);
router.get('/carts', displayCarts);


router.post('/create-order', createOrder);
router.get('/get-orders', getOrdersByCustomer);
router.get('/my-orders', displayOrders);

module.exports = router;