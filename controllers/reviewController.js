const mongoose = require("mongoose");
const Review = require("../models/reviews");

const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1; 
    const limit = 4; 
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ productId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ productId });

    res.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { 
  getReviewsByProduct, 
  getAllReviews, 
  createReview 
};
