require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL encoded data

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Sample API Routes
const apiRouter = express.Router();

apiRouter.get("/hello", (req, res) => {
  res.json({
    message: "Hello from the Small API!",
    description: "This is a clean, modern Express server setup.",
  });
});

apiRouter.post("/echo", (req, res) => {
  const { body } = req;
  res.json({
    received: body,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiRouter);

// Root Route
app.get("/", (req, res) => {
  res.send(`
        <div style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: auto;">
            <h1 style="color: #4a90e2;">Small API V2 is Running</h1>
            <p>Welcome to your new Express API. Minimal, fast, and structured.</p>
            <div style="background: #f4f4f4; padding: 1rem; border-radius: 8px;">
                <strong>Endpoints:</strong>
                <ul>
                    <li>GET <a href="/health">/health</a> - Server status</li>
                    <li>GET <a href="/api/hello">/api/hello</a> - Sample greeting</li>
                    <li>POST /api/echo - Reflection service</li>
                </ul>
            </div>
        </div>
    `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested path ${req.path} does not exist.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong on our end.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  --------------------------------------------------
  Server is running on http://localhost:${PORT}
  Environment: ${process.env.NODE_ENV || "development"}
  --------------------------------------------------
    `);
});
