import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CandidateForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/candidates`, {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        experience: Number(form.experience),
      });
      setMsg("✅ Candidate added!");
      if (onAdded) onAdded();
      setForm({ name: "", email: "", skills: "", experience: "", bio: "" });
    } catch {
      setMsg("❌ Error adding candidate");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Add Candidate</h2>
      {["name", "email", "skills", "experience", "bio"].map((field) => (
        <div key={field}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            {field === "skills" ? " (comma separated)" : ""}
          </label>
          <input
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required={field !== "bio"}
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
        </div>
      ))}
      <button type="submit">Add Candidate</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
