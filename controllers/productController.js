const mongoose = require("mongoose");
const Product = require("../models/product");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (products.length === 0) {
      return sendSuccess(
        res,
        { products: [], totalPages: 0, currentPage: page },
        "No products found",
      );
    }
    const responseData = {
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalItems: totalProducts,
    };

    sendSuccess(res, responseData, "Products fetched successfully");
  } catch (err) {
    sendError(res, err);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid ID format" });
    }

    const product = await Product.findById(new mongoose.Types.ObjectId(id));

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    sendSuccess(res, product, "Success");
  } catch (err) {
    sendError(res, err.message, 500);
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    price,
    images,
    category,
    stock,
    details,
    STRAIGHT_UP,
    THE_LOWDOWN,
  } = req.body;

  if (!name || !price || !images || images.length !== 4) {
    return sendError(res, "All fields required and exactly 4 images", 400);
  }

  try {
    const product = new Product({
      name,
      description: details, 
      price,
      images,
      category,
      stock,
      STRAIGHT_UP,
      THE_LOWDOWN
    });
    const createdProduct = await product.save();
    sendSuccess(res, createdProduct, "Product created successfully");
  } catch (err) {
    sendError(res, err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, "Invalid product ID format", 400);
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return sendError(res, "Product not found", 404);
    }

    sendSuccess(res, updatedProduct, "Product updated successfully");
  } catch (err) {
    sendError(res, err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, "Invalid product ID format", 400);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return sendError(res, "Product not found", 404);
    }

    sendSuccess(res, { deletedId: id }, "Product deleted successfully");
  } catch (err) {
    sendError(res, err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
