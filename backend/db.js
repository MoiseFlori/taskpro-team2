require("dotenv").config();

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });
