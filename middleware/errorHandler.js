
const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // MongoDB duplicate key error (for example, duplicate SKU)
    if (err.code === 11000) {
        statusCode = 400;

        const field = Object.keys(err.keyValue || {})[0] || "field";

        message = `${field} already exists`;
    }

    // Mongoose validation error
    else if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    // Invalid MongoDB ObjectId
    else if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid value for ${err.path}`;
    }

    // Invalid JSON request body
    else if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        statusCode = 400;
        message = "Invalid JSON request body";
    }

    // Mongoose strict mode errors
    else if (err.name === "StrictModeError") {
        statusCode = 400;
        message = "Invalid field provided";
    }

    // Prevent internal server errors from exposing sensitive details
    if (statusCode >= 500) {
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;
