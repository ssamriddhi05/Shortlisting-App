const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// POST - Add candidate
router.post("/", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - All candidates
router.get("/", async (req, res) => {
  const candidates = await Candidate.find().sort({ createdAt: -1 });
  res.json(candidates);
});

module.exports = router;
