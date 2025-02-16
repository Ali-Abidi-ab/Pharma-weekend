const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, availability } = req.body;

  try {
    const product = new Product({ name, availability });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = { getProducts, createProduct };