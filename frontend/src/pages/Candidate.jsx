import CandidateForm from "../components/CandidateForm";
import CandidateList from "../components/CandidateList";
import { useState } from "react";

export default function Candidates() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>
      <CandidateForm onAdded={() => setRefresh((r) => r + 1)} />
      <hr style={{ margin: "30px 0" }} />
      <CandidateList key={refresh} />
    </div>
  );
}
