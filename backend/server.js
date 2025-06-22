// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const cardRoutes = require("./routes/api/cards");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/cards", cardRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to:", mongoose.connection.name))
  .catch((err) => console.error("❌ Connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
