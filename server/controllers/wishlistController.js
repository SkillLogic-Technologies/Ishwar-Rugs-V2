import Wishlist from "../models/Wishlist.js"
import Product from "../models/Product.js"

async function addToWishlist(req, res){
    try {
        const userId = req.user._id
        const { productId } = req.params;

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({user: userId}).populate("products")
        if(!wishlist){
            wishlist = await Wishlist.create({
                user : userId,
                products : [productId]
            })
            return res.status(201).json({success: true, message: "Added to wishlist", data: wishlist.products });
        }

        if (wishlist.products.includes(productId)) {
            return res.status(200).json({ success: true, message: "Already in wishlist" });
        }

        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ success: true, message: "Added to wishlist", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getWishlist(req, res){
    try {
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId }).populate("products"); 
        if (!wishlist) {
            return res.status(200).json([]);
        }

        res.status(200).json({ success: true, data: wishlist.products});
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function removeFromWishlist(req, res){
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }
        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );
        await wishlist.save();

        const updatedWishlist = await Wishlist.findOne({ user: userId }).populate("products");
        res.status(200).json({ success: true, message: "Removed from wishlist", data: updatedWishlist?.products || []});
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addToWishlist, getWishlist, removeFromWishlist }
