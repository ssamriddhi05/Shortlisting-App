const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

router.post("/shortlist", async (req, res) => {
  const { requiredSkills, minExperience } = req.body;

  try {
    const candidates = await Candidate.find();

    const candidateList = candidates
      .map(
        (c, i) =>
          `${i + 1}. ${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience} years`,
      )
      .join("\n");

    const prompt = `
You are a technical recruiter AI.
Job requires: ${requiredSkills.join(", ")} with ${minExperience}+ years experience.

Candidates:
${candidateList}

Rank the top candidates and explain in 1-2 sentences why each is suitable or not.
Return ONLY a valid JSON array like this, no extra text, no markdown:
[{ "name": "", "rank": 1, "reason": "" }]
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5001",
          "X-Title": "HireAI",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // free & reliable on OpenRouter
          messages: [{ role: "user", content: prompt }],
        }),
      },
    );

    const data = await response.json();
    console.log("OpenRouter response:", JSON.stringify(data)); // for debugging

    const text = data.choices?.[0]?.message?.content;
    if (!text)
      return res.status(500).json({ error: "No response from AI", raw: data });

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    res.json(parsed);
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
