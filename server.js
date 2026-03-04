const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

connectDB();

// CORS
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:5500"],
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

app.use(cors({
  origin: [
        'http://127.0.0.1:5500', 
        'http://localhost:5500', 
        'https://beauty-zone-clientapp.vercel.app' 
    ],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// (Routes)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/reviewRoutes"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
