import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

async function addToCart(req, res){
    try {
        const userId = req.user._id
        const { productId } = req.params

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: 1 }]
            });
            return res.status(201).json({ success: true, message: "Added to cart", data: cart });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
        await cart.save();

        res.status(200).json({success: true, message: "Added to cart", data: cart });
        
    } catch (error) {
       res.status(500).json({ success: false, message: error.message }); 
    }
}

async function getCart(req, res) {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({ success: true, items: [] });
    }

    res.status(200).json({ success: true, items: cart});

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

async function updateQuantity (req, res) {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than or equal to one" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item){
      return res.status(404).json({ success: false, message: "Product not in cart" });
    } 

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({ success: true, message: "Quantity updated", items: cart });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function removeFromCart(req, res) {
  try {
      const userId = req.user._id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ user: userId });
      if (!cart){
        return res.status(404).json({ success: false, message: "Cart not found" });
      } 

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
      );

      await cart.save();

      res.status(200).json({ success: true, message: "Removed from cart", items: cart });
  } catch (error) {
      res.status(500).json({success: false, message: error.message });
  }
};

export { addToCart, getCart, updateQuantity, removeFromCart }