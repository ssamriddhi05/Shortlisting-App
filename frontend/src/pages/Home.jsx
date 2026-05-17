import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: 40, color: "#1a1a2e" }}>🎯 HireAI</h1>
      <p
        style={{
          fontSize: 18,
          color: "#555",
          maxWidth: 500,
          margin: "16px auto 40px",
        }}
      >
        AI-powered candidate shortlisting. Add candidates, define job
        requirements, and let AI rank the best fits instantly.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <Link to="/candidates">
          <button
            style={{
              padding: "12px 24px",
              background: "#1a1a2e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Add Candidates
          </button>
        </Link>
        <Link to="/match">
          <button
            style={{
              padding: "12px 24px",
              background: "#e94560",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Start Matching
          </button>
        </Link>
      </div>
    </div>
  );
}
