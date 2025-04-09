import React, { useState } from 'react';
import { LinkedInProfile } from '../types';
import { generatePersonalizedMessage } from '../services/api';

const MessageGenerator: React.FC = () => {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: 'John Doe',
    job_title: 'Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    summary: 'Experienced in AI & ML with 5+ years in software development. Passionate about building scalable systems and solving complex problems.',
  });
  
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generatePersonalizedMessage(profile);
      setMessage(response.message);
    } catch (err) {
      setError('Failed to generate personalized message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="card-title mb-4">LinkedIn Message Generator</h1>
      
      <div className="message-generator">
        <div className="card">
          <h2 className="card-title mb-4">LinkedIn Profile Data</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="job_title"
                value={profile.job_title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Summary</label>
              <textarea
                name="summary"
                value={profile.summary}
                onChange={handleChange}
                className="form-control"
                rows={4}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-block"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  <span className="ml-2">Generating...</span>
                </>
              ) : 'Generate Message'}
            </button>
          </form>
        </div>
        
        <div className="card">
          <h2 className="card-title mb-4">Generated Message</h2>
          
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="message-output">
              {message ? (
                <div className="message-content">{message}</div>
              ) : (
                <div className="message-placeholder">
                  Generated message will appear here
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageGenerator;