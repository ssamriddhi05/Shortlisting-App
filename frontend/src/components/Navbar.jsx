import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#1a1a2e",
        padding: "14px 30px",
        display: "flex",
        gap: 30,
        alignItems: "center",
      }}
    >
      <span style={{ color: "#e94560", fontWeight: "bold", fontSize: 20 }}>
        🎯 HireAI
      </span>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/candidates" style={{ color: "#fff", textDecoration: "none" }}>
        Candidates
      </Link>
      <Link to="/match" style={{ color: "#fff", textDecoration: "none" }}>
        Match
      </Link>
    </nav>
  );
}
