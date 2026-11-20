
const express = require("express");
const router = express.Router();
const validateProduct = require("../middleware/validateProduct");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStock,
    getCategorySummary,
    adjustStock
} = require("../controllers/productController");

// Create Product
router.post("/", validateProduct, createProduct);


// Get All Products
router.get("/", getAllProducts);

// Low Stock Report
router.get("/low-stock", getLowStock);

// Category-wise Summary
router.get("/summary", getCategorySummary);

// Stock Adjustment
router.patch("/:id/stock", adjustStock);

// Get Single Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;
