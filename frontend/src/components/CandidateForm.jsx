import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CandidateForm({ onAdded, editingCandidate, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (editingCandidate) {
      setForm({
        name: editingCandidate.name || "",
        email: editingCandidate.email || "",
        skills: editingCandidate.skills ? editingCandidate.skills.join(", ") : "",
        experience: editingCandidate.experience || "",
        bio: editingCandidate.bio || "",
      });
      setMsg("");
    } else {
      setForm({ name: "", email: "", skills: "", experience: "", bio: "" });
    }
  }, [editingCandidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        experience: Number(form.experience),
      };

      if (editingCandidate) {
        await axios.put(`/api/candidates/${editingCandidate._id}`, payload);
        setMsg("✅ Candidate updated!");
      } else {
        await axios.post(`/api/candidates`, payload);
        setMsg("✅ Candidate added!");
      }
      
      if (onAdded) onAdded();
    } catch (error) {
      console.error("Submit error:", error);
      setMsg(editingCandidate ? `❌ Error updating candidate: ${error.response?.data?.error || error.message}` : `❌ Error adding candidate: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <h2>{editingCandidate ? "Edit Candidate" : "Add Candidate"}</h2>
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
      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" style={{ flex: 1 }}>
          {editingCandidate ? "Update Candidate" : "Add Candidate"}
        </button>
        {editingCandidate && (
          <button 
            type="button" 
            onClick={onCancel}
            style={{ flex: 1, background: "#ccc", color: "#333" }}
          >
            Cancel
          </button>
        )}
      </div>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </form>
  );
}
