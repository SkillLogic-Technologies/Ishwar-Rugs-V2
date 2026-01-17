import Category from '../models/Category.js'

// Create category...
async function createCategory(req,res) {
    try {
        const { name, description, image, isActive } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({success: false, message: "Category name is required"});
        }

        const existing = await Category.findOne({ name: name.trim() });

        if (existing) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        const category = await Category.create({ name, description, image, isActive });
        res.status(201).json({ success: true, message: "Category created successfully", data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Get all categories..
async function getCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get category by id...
async function getCategoryById (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, data: category});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
}

// Update category...
async function updateCategory(req, res) {
    try {
        const { id } = req.params
        const data = req.body

        const category = await Category.findByIdAndUpdate(id, data, {new : true})

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category updated successfully", data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// Delete Category...
async function deleteCategory(req, res) {
    try {
        const category = await Category.findByIdAndDelete(req.params.id) 

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };