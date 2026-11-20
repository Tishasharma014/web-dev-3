
const validateProduct = (req, res, next) => {
    const { name, sku, category, price, quantity } = req.body;

    if (!name || !sku || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: "All required product fields must be provided"
        });
    }

    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
        return res.status(400).json({
            message: "Quantity must be a non-negative integer"
        });
    }

    next();
};

module.exports = validateProduct;
