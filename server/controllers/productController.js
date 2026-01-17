import Product from "../models/Product.js";

// create product...
async function createProduct(req, res) {
    try {
        const { title, category, mrp} = req.body
        if (!title || !category || !mrp) {
            return res.status(400).json({success: false, message: "Title, Category & MRP are required"})
        }
        else if(mrp <= 0){
            return res.status(400).json({success: false, message: "MRP must be greater than 0"})
        }

        const product = await Product.create(req.body)
        res.status(201).json({ success: true, message: "Product created successfully", data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// get products...
async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, data: products})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }  
}

// get product by id..
async function getProductById(req, res){
    try {
        const product = await Product.findById(req.params.id)
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
        const data = req.body
        const product = await Product.findByIdAndUpdate(id, data, { new:true })

        if(!product){
            return res.status(404).json({success: false, message: "Product not found" })
        }
        res.status(200).json({ success: true, message: "Product updated successfully", data: product})
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// delete product
async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({ success: false, message:"Product doesn't exist"})
        }
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

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, userReview }