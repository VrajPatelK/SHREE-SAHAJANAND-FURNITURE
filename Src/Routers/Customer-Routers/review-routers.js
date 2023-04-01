const express = require('express');
const router = express.Router();


//controllers
const {
    createReviewPost,
    createReviewGet,
    displayReviews,
    getAllReviews,
    getReviewSet,
    editReviewPost,
    editReviewGet,
    deleteReview

} = require('../../../Controllers/Customer-Controllers/review-cntrl');

router.get('/create-review', createReviewGet);
router.post('/create-review', createReviewPost);
router.get('/my-reviews', displayReviews);
router.get('/get-reviews', getAllReviews);
router.get('/get-review-set', getReviewSet);
router.get('/edit-review', editReviewGet);
router.post('/edit-review', editReviewPost);
router.get('/delete-review', deleteReview);


module.exports = router;