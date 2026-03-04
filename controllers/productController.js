const mongoose = require("mongoose");
const Product = require("../models/product");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
        return sendSuccess(res, [], "No products found in database");
    }
    sendSuccess(res, products, "Products fetched successfully");
  } catch (err) {
    sendError(res, err);
  }
};




const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "error", message: "Invalid ID format" });
    }

    const product = await Product.findById(new mongoose.Types.ObjectId(id));

    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    sendSuccess(res, product, "Success");
  } catch (err) {
    sendError(res, err.message, 500);
  }
};


const createProduct = async (req, res) => {
  const { name, description, price, images, category, stock } = req.body;

  if (!name || !price || !images || images.length !== 4) {
    return sendError(
      res,
      "All fields required and exactly 4 images",
      400
    );
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      images,
      category,
      stock,
    });
    const createdProduct = await product.save();
    sendSuccess(res, createdProduct, "Product created successfully");
  } catch (err) {
    sendError(res, err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};