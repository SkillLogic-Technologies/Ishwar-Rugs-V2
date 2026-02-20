import User from '../models/User.model.js'
import Product from '../models/Product.js'

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();

    res.status(200).json({ users, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};