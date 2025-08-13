import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../configue";
import "./JobList.css";

// 🔹 Reusable Remove button component
const Remove = ({ jobId, onRemove }) => {
  const handleRemove = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Job post deleted successfully");
        onRemove(jobId);
      } else {
        alert("Failed to delete the job post");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting the job post");
    }
  };

  return (
    <button className="remove-btn" onClick={handleRemove}>
      Remove
    </button>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/jobs`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromList = (deletedJobId) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== deletedJobId));
  };

  return (
    <div className="job-list">
      <h2>All Jobs & Internships</h2>
      <div className="job-cards-container">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Stipend:</strong> {job.stipend}</p>
              <p><strong>Skills Required:</strong> {job.skills}</p>

              {/* ✅ Buttons */}
              <div className="job-card-buttons">
                <Remove jobId={job._id} onRemove={handleRemoveFromList} className="remove-btn"/>
                <Link to={`/edit-jobs/${job._id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
