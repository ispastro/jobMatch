import React, { useState, useEffect } from 'react';

const JobPostPage = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/job_posts');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError('Failed to load job posts.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/job_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to post job');

      const newJob = await response.json();
      setJobs([newJob, ...jobs]);

      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        category: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job post?')) return;

    try {
      const response = await fetch(`/api/job_posts/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
      });

      if (!response.ok) throw new Error('Failed to delete job');

      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>

      {error && <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
            className="border rounded p-2 w-full"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Select Category</option>
            <option value="construction">Construction</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="transportation">Transportation</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows="4"
          required
          className="border rounded p-2 w-full"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Recent Job Posts</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <div className="text-sm mt-1 text-gray-500">
                  <span>{job.location} | </span>
                  <span>{job.salary} | </span>
                  <span>{job.category}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPostPage;
