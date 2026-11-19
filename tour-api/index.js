const express = require("express");
const tourRoutes = require("./route/tourRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api", tourRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
