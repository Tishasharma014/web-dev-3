const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware (order matters: JSON parser must come before the routes)
app.use(express.json());
app.use(logger);

// Routes
app.use("/students", studentRoutes);

// Unknown route -> 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler (must have 4 parameters)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});