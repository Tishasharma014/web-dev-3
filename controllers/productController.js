
const Product = require("../models/Product");

// Async wrapper: forwards errors to centralized error middleware
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Create Product API
const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        message: "Product created successfully",
        product
    });
});

// Get All Products — Filtering, Sorting & Pagination
const getAllProducts = asyncHandler(async (req, res) => {
    const query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }

    if (req.query.minPrice !== undefined || req.query.maxPrice !== undefined) {
        query.price = {};

        if (req.query.minPrice !== undefined) {
            query.price.$gte = Number(req.query.minPrice);
        }

        if (req.query.maxPrice !== undefined) {
            query.price.$lte = Number(req.query.maxPrice);
        }
    }

    // Sorting
    const sort = {};

    if (req.query.sort) {
        const field = req.query.sort.startsWith("-")
            ? req.query.sort.substring(1)
            : req.query.sort;

        const order = req.query.sort.startsWith("-") ? -1 : 1;

        const allowedSortFields = [
            "name",
            "price",
            "quantity",
            "category",
            "createdAt"
        ];

        if (!allowedSortFields.includes(field)) {
            const error = new Error("Invalid sorting field");
            error.statusCode = 400;
            throw error;
        }

        sort[field] = order;
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!Number.isInteger(page) || page < 1 ||
        !Number.isInteger(limit) || limit < 1 || limit > 100) {
        const error = new Error(
            "Page must be positive and limit must be between 1 and 100"
        );
        error.statusCode = 400;
        throw error;
    }

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        total,
        page,
        totalPages: Math.ceil(total / limit),
        count: products.length,
        products
    });
});

// Get Single Product by ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        product
    });
});

// Update Product Details
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Product updated successfully",
        product
    });
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        message: "Product deleted successfully",
        id: product._id
    });
});

// Low-Stock Alert Report using MongoDB Aggregation
const getLowStock = asyncHandler(async (req, res) => {
    const lowStockItems = await Product.aggregate([
        {
            $match: {
                $expr: {
                    $lte: ["$quantity", "$reorderLevel"]
                }
            }
        },
        {
            $project: {
                name: 1,
                sku: 1,
                category: 1,
                price: 1,
                quantity: 1,
                reorderLevel: 1,
                supplier: 1,
                stockValue: {
                    $multiply: ["$price", "$quantity"]
                },
                shortage: {
                    $subtract: ["$reorderLevel", "$quantity"]
                }
            }
        },
        {
            $sort: {
                quantity: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        message: "Low-stock report generated successfully",
        count: lowStockItems.length,
        lowStockItems
    });
});

// Category-wise Inventory Summary using Aggregation
const getCategorySummary = asyncHandler(async (req, res) => {
    const summary = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                totalItems: {
                    $sum: 1
                },
                totalQuantity: {
                    $sum: "$quantity"
                },
                totalStockValue: {
                    $sum: {
                        $multiply: ["$price", "$quantity"]
                    }
                },
                avgPrice: {
                    $avg: "$price"
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        categories: summary.length,
        summary
    });
});

// Stock Adjustment — Restock and Sale
const adjustStock = asyncHandler(async (req, res) => {
    const change = req.body.change;

    if (!Number.isInteger(change) || change === 0) {
        const error = new Error(
            "Change must be a non-zero integer"
        );
        error.statusCode = 400;
        throw error;
    }

    // Atomically update stock while preventing negative quantity
    const product = await Product.findOneAndUpdate(
        {
            _id: req.params.id,
            $expr: {
                $gte: [
                    { $add: ["$quantity", change] },
                    0
                ]
            }
        },
        {
            $inc: {
                quantity: change
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        const existingProduct = await Product.findById(req.params.id);

        if (!existingProduct) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        const error = new Error("Insufficient stock");
        error.statusCode = 400;
        throw error;
    }

    res.status(200).json({
        message: "Stock updated successfully",
        product
    });
});

// Export all controller functions
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStock,
    getCategorySummary,
    adjustStock
};
