import axios from 'axios';
import { Campaign, NewCampaign, LinkedInProfile, PersonalizedMessage } from '../types';

const API_URL = 'https://campaign-management-backend.onrender.com/api';

// Campaign API calls
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get(`${API_URL}/campaigns`);
  return response.data;
};

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
  const response = await axios.get(`${API_URL}/campaigns/${id}`);
  return response.data;
};

export const createCampaign = async (campaign: NewCampaign): Promise<Campaign> => {
  const response = await axios.post(`${API_URL}/campaigns`, campaign);
  return response.data;
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  const response = await axios.put(`${API_URL}/campaigns/${id}`, campaign);
  return response.data;
};

export const deleteCampaign = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/campaigns/${id}`);
};

// Message API calls
export const generatePersonalizedMessage = async (profile: LinkedInProfile): Promise<PersonalizedMessage> => {
  const response = await axios.post(`${API_URL}/personalized-message`, profile);
  return response.data;
};
