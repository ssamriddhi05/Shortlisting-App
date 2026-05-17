import { useState } from "react";

export default function JobForm({ onMatch, onAIMatch }) {
  const [form, setForm] = useState({ requiredSkills: "", minExperience: 0 });

  const getPayload = () => ({
    requiredSkills: form.requiredSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    minExperience: Number(form.minExperience),
  });

  return (
    <div
      style={{
        background: "#f0f4ff",
        padding: 20,
        borderRadius: 8,
        maxWidth: 500,
        marginBottom: 30,
      }}
    >
      <h2>Job Requirements</h2>

      <label>Required Skills (comma separated)</label>
      <input
        placeholder="e.g. React, Node.js, MongoDB"
        value={form.requiredSkills}
        onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })}
        style={{
          display: "block",
          width: "100%",
          padding: 8,
          marginBottom: 12,
        }}
      />

      <label>Minimum Experience (years)</label>
      <input
        type="number"
        min={0}
        value={form.minExperience}
        onChange={(e) => setForm({ ...form, minExperience: e.target.value })}
        style={{
          display: "block",
          width: "100%",
          padding: 8,
          marginBottom: 16,
        }}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => onMatch(getPayload())}
          style={{
            padding: "8px 16px",
            background: "#1a1a2e",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Basic Match
        </button>
        <button
          onClick={() => onAIMatch(getPayload())}
          style={{
            padding: "8px 16px",
            background: "#e94560",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          🤖 AI Match
        </button>
      </div>
    </div>
  );
}
