import React, { useState } from 'react';
import './App.css';
import CampaignList from './components/campaigns/Campaignlist';
import MessageGenerator from './components/message/messagegenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'message'>('campaigns');

  return (
    <div className="app-wrapper">
      <header>
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Campaign Management System</h1>
            <div className="header-actions">
              {/* You could add user profile, notifications, etc. here */}
            </div>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="nav-tabs">
          <div 
            className={`nav-tab ${activeTab === 'campaigns' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="2"></circle>
            </svg>
            Campaigns
          </div>
          <div 
            className={`nav-tab ${activeTab === 'message' ? 'active' : ''}`}
            onClick={() => setActiveTab('message')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Message Generator
          </div>
        </div>
        
        <main className="content-area">
          {activeTab === 'campaigns' ? <CampaignList /> : <MessageGenerator />}
        </main>
      </div>
    </div>
  );
};

export default App;