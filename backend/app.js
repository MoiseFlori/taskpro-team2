const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/api/users");
const cardRoutes = require("./routes/api/cards");
const boardRoutes = require("./routes/api/boards");
const helpRoutes = require("./routes/api/help");
const columnsRoutes = require("./routes/api/columns");
const googleAuthRoutes = require("./routes/api/googleAuth");
const passport = require("passport");
const connectDB = require("./db");

require("./helpers/googleAuth");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(logger("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(passport.initialize());
app.use(googleAuthRoutes);
app.use("/users", userRouter);
app.use("/api/cards", cardRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/help", helpRoutes);
app.use("/api", columnsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
