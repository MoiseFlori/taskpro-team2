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

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("❌ MONGODB_URI lipsește din .env");

  try {
    await mongoose.connect(uri);
    console.log("✅ Conectat la:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ Eroare la conectarea MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;

