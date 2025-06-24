const express = require('express');
const router = express.Router();
const Board = require('../../models/board');
const auth = require('../../middlewares/auth');

// Create new board
router.post('/', auth, async (req, res) => {
  try {
    const { title, icon, background } = req.body;
    if (!title || !icon || !background) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Add createdBy using the logged-in user ID (from req.user)
    console.log('REQ.USER:', req.user);
    const board = await Board.create({
      title,
      icon,
      background,
      createdBy: req.user._id
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Edit board
router.patch('/:id', auth, async (req, res) => {
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

// Get all boards by user (for sidebar)
router.get('/', auth, async (req, res) => {
  const userId = req.user._id;
  const boards = await Board.find({ createdBy: userId });
  res.json(boards);
});

// Delete board
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Board.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Board not found' });
    res.json({ message: 'Board deleted', id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
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