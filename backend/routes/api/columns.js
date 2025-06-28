const express = require("express");
const router = express.Router();
const {
  getColumnsByBoard,
  createColumn,
  updateColumn,
  deleteColumn,
} = require("../../controllers/columns");

const auth = require("../../middlewares/auth");
router.use(auth);

// GET columns for a board
router.get("/boards/:boardId/columns", getColumnsByBoard);

// CREATE column
router.post("/columns", createColumn);

// UPDATE column
router.patch("/columns/:id", updateColumn);

// DELETE column
router.delete("/columns/:id", deleteColumn);

module.exports = router;
