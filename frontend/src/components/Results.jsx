import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const tierColor = { High: "#4CAF50", Medium: "#FF9800", Low: "#f44336" };

export default function Results({ results, aiResults, loading }) {
  return (
    <div>
      {/* Basic Match Results */}
      {results.length > 0 && (
        <div>
          <h3>📊 Match Results</h3>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={results.slice(0, 8)}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} unit="%" />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="matchScore">
                {results.slice(0, 8).map((c, i) => (
                  <Cell key={i} fill={tierColor[c.tier] || "#8884d8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 14,
              marginTop: 16,
            }}
          >
            {results.map((c, i) => (
              <div
                key={i}
                style={{
                  border: `2px solid ${tierColor[c.tier]}`,
                  borderRadius: 8,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{c.name}</h4>
                  <span
                    style={{
                      background: tierColor[c.tier],
                      color: "#fff",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontSize: 12,
                    }}
                  >
                    {c.tier}
                  </span>
                </div>
                <p style={{ margin: "8px 0 4px" }}>
                  <b>Match Score:</b> {c.matchScore}%
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <b>Experience:</b> {c.experience} yrs
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {c.matchedSkills.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        background: "#e8f5e9",
                        border: "1px solid #4CAF50",
                        borderRadius: 4,
                        padding: "1px 6px",
                        fontSize: 12,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Results */}
      {loading && (
        <p style={{ textAlign: "center", color: "#e94560", marginTop: 20 }}>
          🤖 AI is analyzing candidates...
        </p>
      )}

      {aiResults.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>🤖 AI Recommendations</h3>
          {aiResults.map((c, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #e94560",
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
                background: "#fff5f5",
              }}
            >
              <h4 style={{ margin: "0 0 8px" }}>
                #{c.rank} — {c.name}
              </h4>
              <p style={{ margin: 0, color: "#333" }}>{c.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
