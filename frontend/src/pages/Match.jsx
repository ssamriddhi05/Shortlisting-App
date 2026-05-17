import { useState } from "react";
import axios from "axios";
import JobForm from "../components/JobForm";
import Results from "../components/Results";

const API = import.meta.env.VITE_API_URL;

export default function Match() {
  const [results, setResults] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMatch = async (payload) => {
    const res = await axios.post(`/api/match`, payload);
    setResults(res.data);
    setAiResults([]);
  };

  const handleAIMatch = async (payload) => {
    setLoading(true);
    setAiResults([]);
    const res = await axios.post(`/api/ai/shortlist`, payload);
    setAiResults(res.data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>
      <JobForm onMatch={handleMatch} onAIMatch={handleAIMatch} />
      <Results results={results} aiResults={aiResults} loading={loading} />
    </div>
  );
}
