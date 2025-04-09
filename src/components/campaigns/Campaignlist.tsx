import React, { useState, useEffect } from 'react';
import CampaignItem from './CampaignItem';
import CampaignForm from './CampaignForm';
import { Campaign, NewCampaign, CampaignStatus } from '../types';
import { 
  fetchCampaigns, 
  createCampaign, 
  updateCampaign, 
  deleteCampaign 
} from '../services/api';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>(undefined);

  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError('Failed to load campaigns');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleCreateCampaign = async (newCampaign: NewCampaign) => {
    try {
      await createCampaign(newCampaign);
      setShowForm(false);
      loadCampaigns();
    } catch (err) {
      setError('Failed to create campaign');
      console.error(err);
    }
  };

  const handleUpdateCampaign = async (updatedCampaign: NewCampaign) => {
    if (!currentCampaign) return;
    
    try {
      await updateCampaign(currentCampaign._id, updatedCampaign);
      setShowForm(false);
      setCurrentCampaign(undefined);
      loadCampaigns();
    } catch (err) {
      setError('Failed to update campaign');
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: string, newStatus: CampaignStatus) => {
    try {
      await updateCampaign(id, { status: newStatus });
      loadCampaigns();
    } catch (err) {
      setError('Failed to update campaign status');
      console.error(err);
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(id);
        loadCampaigns();
      } catch (err) {
        setError('Failed to delete campaign');
        console.error(err);
      }
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentCampaign(undefined);
  };

  if (isLoading) {
    return <div className="loading">Loading campaigns...</div>;
  }

  return (
    <div className="campaign-list-container">
      <div className="campaign-list-header">
        <h2>Campaigns</h2>
        <button onClick={() => setShowForm(true)} className="add-campaign-btn">
          Add Campaign
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <CampaignForm
          campaign={currentCampaign}
          onSubmit={currentCampaign ? handleUpdateCampaign : handleCreateCampaign}
          onCancel={handleCancelForm}
        />
      )}

      <div className="campaign-list">
        {campaigns.length === 0 ? (
          <div className="no-campaigns">No campaigns found</div>
        ) : (
          campaigns.map(campaign => (
            <CampaignItem
              key={campaign._id}
              campaign={campaign}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteCampaign}
              onEdit={handleEditCampaign}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CampaignList;