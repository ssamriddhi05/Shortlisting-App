const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {
  const { requiredSkills, minExperience } = req.body;
  const candidates = await Candidate.find({
    experience: { $gte: minExperience },
  });

  const results = candidates
    .map((candidate) => {
      const matched = candidate.skills.filter((s) =>
        requiredSkills.map((r) => r.toLowerCase()).includes(s.toLowerCase()),
      );
      const score = Math.round((matched.length / requiredSkills.length) * 100);
      return {
        ...candidate.toObject(),
        matchScore: score,
        matchedSkills: matched,
        tier: score >= 70 ? "High" : score >= 40 ? "Medium" : "Low",
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json(results);
});

module.exports = router;
