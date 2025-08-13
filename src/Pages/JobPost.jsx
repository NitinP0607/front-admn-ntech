import React, { useState } from "react";
import { API_BASE_URL } from "../configue";
import "./JobPost.css";

const JobPost = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("Job posted successfully!");
      setFormData({
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
    } else {
      setMessage("Failed to post job. Please try again.");
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post New Job/Internship</h2>
      <form onSubmit={handleSubmit} className="post-job-form">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />

        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>

        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" />
        <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
        <input type="text" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="Stipend" />
        <input type="text" name="ctc" value={formData.ctc} onChange={handleChange} placeholder="CTC (if any)" />
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills Required" />
        <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Other Requirements" />

        <button type="submit">Post Job</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default JobPost;
