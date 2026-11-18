const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "uyfkfft",
        { expiresIn: "1h" }
    );
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser);
        return res.status(201).json({
            message: "User registered successfully",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};



module.exports = {
    registerUser
};