const axios = require('axios');
async function test() {
  try {
    const res = await axios.get('http://localhost:5001/api/candidates');
    const candidates = res.data;
    if (candidates.length > 0) {
      const c = candidates[0];
      console.log("Candidate to edit/delete:", c._id);
      
      // Test PUT
      const putRes = await axios.put(`http://localhost:5001/api/candidates/${c._id}`, {
        name: c.name + " updated",
        email: c.email,
        skills: c.skills,
        experience: c.experience,
        bio: c.bio
      });
      console.log("PUT status:", putRes.status);
      
      // Test DELETE
      const delRes = await axios.delete(`http://localhost:5001/api/candidates/${c._id}`);
      console.log("DELETE status:", delRes.status);
    } else {
      console.log("No candidates found");
    }
  } catch (err) {
    console.error("ERROR:", err.message, err.response?.data);
  }
}
test();
