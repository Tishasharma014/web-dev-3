
const mongoose = require("mongoose");

// Create Product Schema
const productSchema = new mongoose.Schema(
    {
        // Product Name
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        // Unique Product Code
        sku: {
            type: String,
            required: [true, "SKU is required"],
            unique: true,
            trim: true
        },

        // Product Category
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },

        // Product Price
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },

        // Available Stock
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number"
            }
        },

        // Minimum Stock Level
        reorderLevel: {
            type: Number,
            required: true,
            default: 10,
            min: [0, "Reorder level cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Reorder level must be a whole number"
            }
        },

        // Supplier Name
        supplier: {
            type: String,
            required: [true, "Supplier name is required"],
            trim: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Calculate total stock value
productSchema.virtual("stockValue").get(function () {
    return this.price * this.quantity;
});

// Create Product Model
const Product = mongoose.model("Product", productSchema);

// Export Model
module.exports = Product;
