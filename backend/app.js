const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const connectDB = require("./db");
const cookieParser = require("cookie-parser");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const userRouter = require("./routes/api/users");

app.use(logger(formatsLogger));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
