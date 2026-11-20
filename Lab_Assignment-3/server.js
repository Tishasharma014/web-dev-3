
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

// Import Product Routes
const productRoutes = require("./routes/productRoutes");

// Create Express Application
const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Inventory Management System API is running!");
});

// Product Routes
app.use("/api/products", productRoutes);
// Centralized Error Handling
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed:", error.message);
    });
