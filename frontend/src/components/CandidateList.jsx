import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/candidates`).then((res) => setCandidates(res.data));
  }, []);

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>All Candidates ({candidates.length})</h2>
      <input
        placeholder="🔍 Search by name or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: "100%", maxWidth: 400, marginBottom: 20 }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((c, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              background: "#f9f9f9",
            }}
          >
            <h3 style={{ margin: "0 0 6px" }}>{c.name}</h3>
            <p style={{ margin: "0 0 6px", color: "#666", fontSize: 14 }}>
              {c.email}
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <b>Experience:</b> {c.experience} yr
              {c.experience !== 1 ? "s" : ""}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.skills.map((s, j) => (
                <span
                  key={j}
                  style={{
                    background: "#1a1a2e",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 12,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            {c.bio && (
              <p style={{ marginTop: 10, fontSize: 13, color: "#555" }}>
                {c.bio}
              </p>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p>No candidates found.</p>}
      </div>
    </div>
  );
}
