const express = require('express');
const router = express.Router();
const Board = require('../../models/board');

// Create new board
router.post('/', async (req, res) => {
  try {
    const { title, icon, background } = req.body;
    if (!title || !icon || !background) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const board = await Board.create({ title, icon, background });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit board
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, background } = req.body;
    const updated = await Board.findByIdAndUpdate(
      id,
      { title, icon, background },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Board not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all boards (for sidebar)
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete board
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Board.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Board not found' });
    res.json({ message: 'Board deleted', id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;

