require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const tourRoutes = require("./route/tourRoute");
const authRoutes = require("./route/authRoute");

const app = express();


app.use(express.json());

// Routes
app.use("/", tourRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
    });