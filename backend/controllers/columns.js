const Column = require("../models/columns");

// GET /api/boards/:boardId/columns
const getColumnsByBoard = async (req, res) => {
  const { boardId } = req.params;
  const owner = req.user._id;

  const columns = await Column.find({ boardId, owner });
  res.json(columns);
};

// POST /api/columns
const createColumn = async (req, res) => {
  const { title, boardId } = req.body;
  const owner = req.user._id;

  const column = await Column.create({ title, boardId, owner });
  res.status(201).json(column);
};
// PATCH /api/columns/:id
const updateColumn = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const column = await Column.findByIdAndUpdate(id, { title }, { new: true });

  if (!column) return res.status(404).json({ message: "Column not found" });

  res.json(column);
};

// DELETE /api/columns/:id
const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const deleted = await Column.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Column not found" });
  res.json({ message: "Deleted", id });
};

module.exports = {
  getColumnsByBoard,
  createColumn,
  updateColumn,
  deleteColumn,
};
