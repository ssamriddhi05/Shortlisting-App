const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  skills: [String],
  experience: Number,
  bio: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
