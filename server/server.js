// Import packages
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from './config/db.js'
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from '@clerk/express'
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";


// Initialize Express app
const app = express();

// connect db
await connectDB()

// clerk middleware
app.use(clerkMiddleware())

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

//Cloudinary
connectCloudinary(); 

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// clerk webhook route
app.post('/api/clerk', clerkWebhooks);

// routes
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Set the port from environment variable or default
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
