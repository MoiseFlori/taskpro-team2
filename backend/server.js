require("dotenv").config();
console.log("📂 MONGODB_URI =", process.env.MONGODB_URI);

const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running. Use our API on port: ${PORT}`);
// });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server pornit la http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("💥 Serverul nu a pornit din cauza MongoDB:", err.message);
  });
