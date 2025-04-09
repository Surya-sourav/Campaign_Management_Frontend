import React, { useState, useEffect } from 'react';
import { Campaign, NewCampaign, CampaignStatus } from '../types';

interface CampaignFormProps {
  campaign?: Campaign;
  onSubmit: (campaign: NewCampaign) => void;
  onCancel: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ campaign, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<NewCampaign>({
    name: '',
    description: '',
    status: CampaignStatus.ACTIVE,
    leads: [],
    accountIDs: []
  });
  
  const [leadsInput, setLeadsInput] = useState<string>('');
  const [accountIDsInput, setAccountIDsInput] = useState<string>('');

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description,
        status: campaign.status,
        leads: campaign.leads,
        accountIDs: campaign.accountIDs
      });
      
      setLeadsInput(campaign.leads.join(', '));
      setAccountIDsInput(campaign.accountIDs.join(', '));
    }
  }, [campaign]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLeadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeadsInput(e.target.value);
    // Convert comma-separated string to array and trim whitespace
    const leadsArray = e.target.value.split(',').map(lead => lead.trim()).filter(lead => lead);
    setFormData({ ...formData, leads: leadsArray });
  };

  const handleAccountIDsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccountIDsInput(e.target.value);
    // Convert comma-separated string to array and trim whitespace
    const accountIDsArray = e.target.value.split(',').map(id => id.trim()).filter(id => id);
    setFormData({ ...formData, accountIDs: accountIDsArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <h2>{campaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Campaign Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={CampaignStatus.ACTIVE}>Active</option>
          <option value={CampaignStatus.INACTIVE}>Inactive</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="leads">LinkedIn Profile URLs (comma-separated):</label>
        <textarea
          id="leads"
          name="leads"
          value={leadsInput}
          onChange={handleLeadsChange}
          placeholder="https://linkedin.com/in/profile-1, https://linkedin.com/in/profile-2"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="accountIDs">Account IDs (comma-separated):</label>
        <textarea
          id="accountIDs"
          name="accountIDs"
          value={accountIDsInput}
          onChange={handleAccountIDsChange}
          placeholder="123, 456, 789"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {campaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;