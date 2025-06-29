const express = require("express");
const router = express.Router();
const Card = require("../../models/card");
const auth = require("../../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    console.log("Primit card:", req.body);
    // const newCard = new Card(req.body);
    const newCard = new Card({
      ...req.body,
      owner: req.user._id, // req.user._id comes from auth middleware
    });
    if (!req.user) {
      console.warn("⚠️ Nu există req.user în router POST!");
    }

    console.log("User logat:", req.user?._id);
    console.log("Validam:", newCard.validateSync());

    const savedCard = await newCard.save();

    console.log("Card salvat:", savedCard);
    res
      .status(201)
      .json({ message: "✅ Card salvat cu succes", card: savedCard });
  } catch (err) {
    res.status(500).json({ error: "Error saving card", details: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(cards);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error loading cards", details: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (card.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting card" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { Types } = require("mongoose");

    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const card = await Card.findById(req.params.id);

    if (card.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { Types } = require("mongoose");

    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const objectId = new Types.ObjectId(req.params.id);

    const updatedCard = await Card.findByIdAndUpdate(objectId, req.body, {
      new: true,
    });

    if (updatedCard.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    console.log("PATCH primit pentru ID:", objectId);
    console.log("Corpul cererii:", req.body);

    if (!updatedCard) {
      console.warn("Card not found with ID:", objectId);
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (err) {
    console.error("PATCH error:", err);
    res.status(500).json({ error: "Error updating card" });
  }
});

// GET cards by column ID
router.get("/column/:columnId", auth, async (req, res) => {
  try {
    const { columnId } = req.params;
    const cards = await Card.find({
      column: columnId,
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(cards);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error getting cards by column", details: err.message });
  }
});

router.get("/column/:columnId", auth, async (req, res) => {
  try {
    const { columnId } = req.params;
    const { priority } = req.query;
    const filter = {
      column: columnId,
      owner: req.user._id,
    };
    if (priority) {
      filter.priority = priority;
    }

    let cards = await Card.find(filter);

    const PRIORITY_ORDER = { green: 1, pink: 2, blue: 3, gray: 4 };

    cards = cards.sort((a, b) => {
      const prioA = PRIORITY_ORDER[a.priority] || 5;
      const prioB = PRIORITY_ORDER[b.priority] || 5;
      if (!priority && prioA !== prioB) return prioA - prioB;

      if (a.deadline && b.deadline) {
        const [dA, mA, yA] = a.deadline.split("/").map(Number);
        const [dB, mB, yB] = b.deadline.split("/").map(Number);
        const dateA = new Date(yA, mA - 1, dA);
        const dateB = new Date(yB, mB - 1, dB);
        return dateA - dateB;
      }
      return 0;
    });

    res.json(cards);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error getting cards by column", details: err.message });
  }
});

module.exports = router;
