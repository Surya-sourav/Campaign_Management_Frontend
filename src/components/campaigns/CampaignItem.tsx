import React from 'react';
import { Campaign, CampaignStatus } from '../types';

interface CampaignItemProps {
  campaign: Campaign;
  onToggleStatus: (id: string, newStatus: CampaignStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (campaign: Campaign) => void;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ 
  campaign, 
  onToggleStatus, 
  onDelete, 
  onEdit 
}) => {
  const handleToggleStatus = () => {
    const newStatus = campaign.status === CampaignStatus.ACTIVE 
      ? CampaignStatus.INACTIVE 
      : CampaignStatus.ACTIVE;
    
    onToggleStatus(campaign._id, newStatus);
  };

  return (
    <div className="campaign-item">
      <div className="campaign-header">
        <h3>{campaign.name}</h3>
        <div className="campaign-actions">
          <button 
            onClick={handleToggleStatus}
            className={`status-toggle ${campaign.status === CampaignStatus.ACTIVE ? 'active' : 'inactive'}`}
          >
            {campaign.status === CampaignStatus.ACTIVE ? 'Active' : 'Inactive'}
          </button>
          <button onClick={() => onEdit(campaign)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(campaign._id)} className="delete-btn">Delete</button>
        </div>
      </div>
      
      <p className="campaign-description">{campaign.description}</p>
      
      <div className="campaign-details">
        <div className="leads">
          <strong>Leads:</strong> {campaign.leads.length}
        </div>
        <div className="accounts">
          <strong>Account IDs:</strong> {campaign.accountIDs.length}
        </div>
      </div>
    </div>
  );
};

export default CampaignItem;