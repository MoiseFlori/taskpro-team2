// routes/cards.js
const express = require("express");
const router = express.Router();
const Card = require("../../controllers/card");

router.post("/", async (req, res) => {
    try {
        console.log("📬 Primit card:", req.body);
        const newCard = new Card(req.body);
        const savedCard = await newCard.save();
        console.log("💾 Card salvat:", savedCard);
        res.status(201).json(savedCard);
    } catch (err) {
        console.error("❌ Error at saving:", err);
        res.status(500).json({ error: "Error saving card", details: err.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error loading cards", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting card" });
  }
});

module.exports = router;
