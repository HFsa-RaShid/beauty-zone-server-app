const express = require('express');
const router = express.Router();
const { getAllReviews, createReview , getReviewsByProduct} = require('../controllers/reviewController');

router.get('/reviews',getAllReviews);
router.post('/reviews',createReview);
router.get("/reviews/:productId", getReviewsByProduct);

module.exports = router;