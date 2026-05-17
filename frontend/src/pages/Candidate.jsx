import CandidateForm from "../components/CandidateForm";
import CandidateList from "../components/CandidateList";
import { useState } from "react";

export default function Candidates() {
  const [refresh, setRefresh] = useState(0);
  const [editingCandidate, setEditingCandidate] = useState(null);

  const handleRefresh = () => {
    setRefresh((r) => r + 1);
    setEditingCandidate(null);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>
      <CandidateForm 
        onAdded={handleRefresh} 
        editingCandidate={editingCandidate}
        onCancel={() => setEditingCandidate(null)}
      />
      <hr style={{ margin: "30px 0" }} />
      <CandidateList 
        key={refresh} 
        onEdit={(c) => {
          setEditingCandidate(c);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDeleted={handleRefresh}
      />
    </div>
  );
}
