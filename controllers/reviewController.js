const Reviews = require('../models/reviews');
const mongoose = require("mongoose");
const getAllReviews = async (req, res) => {
    try {
        const review = await Reviews.find().sort({ createdAt: -1 }); 
        res.status(200).json(review);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};


const createReview = async (req, res) => {
    try {
        const newReview = await Reviews.create(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllReviews,
    createReview
};