async function test() {
  try {
    const res = await fetch('http://localhost:5001/api/candidates');
    const candidates = await res.json();
    if (candidates.length > 0) {
      const c = candidates[0];
      console.log("Candidate to edit/delete:", c._id);
      
      // Test PUT
      const putRes = await fetch(`http://localhost:5001/api/candidates/${c._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: c.name + " updated",
          email: c.email,
          skills: c.skills,
          experience: c.experience,
          bio: c.bio
        })
      });
      console.log("PUT status:", putRes.status);
      
      // Test DELETE
      const delRes = await fetch(`http://localhost:5001/api/candidates/${c._id}`, {
        method: 'DELETE'
      });
      console.log("DELETE status:", delRes.status);
    } else {
      console.log("No candidates found");
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
test();
