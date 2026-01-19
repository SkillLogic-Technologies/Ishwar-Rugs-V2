import Product from "../models/Product.js";
import fs from "fs"

// create product...
async function createProduct(req, res) {
    try {
        const { title, category, mrp} = req.body
        if (!title || !category || !mrp) {
            return res.status(400).json({success: false, message: "Title, Category & MRP are required"})
        }
        if(mrp <= 0){
            return res.status(400).json({success: false, message: "MRP must be greater than 0"})
        }

        const data = {...req.body}
        if (req.files && req.files.thumbnail) {
            data.thumbnail = req.files.thumbnail[0].path;
        }
        if (req.files && req.files.images.length > 0) {
            data.images = req.files.images.map(file => file.path);
        }

        const product = await Product.create(data)
        res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// get products...
async function getProducts(req, res) {
    try {
        let filter = {};

        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.minPrice && req.query.maxPrice) {
            filter.price = {
                $gte: Number(req.query.minPrice),
                $lte: Number(req.query.maxPrice)
            }
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const products = await Product.find(filter).skip(skip).limit(limit);

        res.status(200).json({success: true, data: products})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }  
}

// get product by id..
async function getProductBySlug(req, res){
    try {
        const product = await Product.findOne({slug: req.params.slug});
        if(!product){
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        res.status(200).json({ success: true, data: product })    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// update product
async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        
        if(!product){
            return res.status(404).json({success: false, message: "Product not found" })
        }

        const updatedData = { ...req.body };
        if (req.files && req.files.thumbnail) {
            if (product.thumbnail && fs.existsSync(product.thumbnail)) {
                fs.unlinkSync(product.thumbnail);
            }
            updatedData.thumbnail = req.files.thumbnail[0].path;
        }

        if (req.files && req.files.images?.length > 0) {
            product.images?.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
            updatedData.images = req.files.images.map(file => file.path);
        }

        const updatedProduct = await Product.findByIdAndUpdate( id, updatedData, { new: true });
        
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct})
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// delete product
async function deleteProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({ success: false, message:"Product doesn't exist"})
        }
        else if (product.images) {
            product.images.forEach(img => fs.existsSync(img) && fs.unlinkSync(img));
        }
        
        if (product.thumbnail && fs.existsSync(product.thumbnail)) {
            fs.unlinkSync(product.thumbnail);
        }
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({ success: true, message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function userReview(req, res){
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success:false, message: "Product not found" })
        }

        const review = {
            user: req.user.id,
            comment,
            rating: Number(rating)
        }

        product.reviews.push(review);
        product.rating = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;
        await product.save();

        res.status(200).json({success : true, message: "Review added successfully"})

    } catch (error) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export { createProduct, getProducts, getProductBySlug, updateProduct, deleteProduct, userReview }