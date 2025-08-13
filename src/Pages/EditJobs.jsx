import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../configue";
import "./EditJobs.css";

const EditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Job",
    location: "",
    duration: "",
    experience: "",
    stipend: "",
    ctc: "",
    skills: "",
    requirements: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`${API_BASE_URL}api/jobs/${id}`);
      const data = await res.json();
      setFormData(data);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("Job updated successfully!");
      setTimeout(() => navigate("/all-jobs"), 1500);
    } else {
      setMessage("Failed to update job.");
    }
  

  };

  return (
    <div className="edit-job-container">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit} className="edit-job-form">
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <select
          name="category"
          value={formData.category || "Job"}
          onChange={handleChange}
        >
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="duration"
          value={formData.duration || ""}
          onChange={handleChange}
          placeholder="Duration"
        />
        <input
          type="text"
          name="experience"
          value={formData.experience || ""}
          onChange={handleChange}
          placeholder="Experience"
        />
        <input
          type="text"
          name="stipend"
          value={formData.stipend || ""}
          onChange={handleChange}
          placeholder="Stipend"
        />
        <input
          type="text"
          name="ctc"
          value={formData.ctc || ""}
          onChange={handleChange}
          placeholder="CTC (if any)"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills || ""}
          onChange={handleChange}
          placeholder="Skills Required"
        />
        <textarea
          name="requirements"
          value={formData.requirements || ""}
          onChange={handleChange}
          placeholder="Other Requirements"
        />

        <button type="submit">Update Job</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default EditJobs;
