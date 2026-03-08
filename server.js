const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const SSLCommerzPayment = require("sslcommerz-lts");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

connectDB();

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5001",
      "http://localhost:5173",
      "https://beauty-zone-clientapp-ew9c.vercel.app",
      "https://beautyzone-react-client.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// (Routes)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/reviewRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
