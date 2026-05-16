import React from 'react';
import { TrendingUp, BarChart3, Building2 } from 'lucide-react';
import InfoCard from './InfoCard';

const Dashboard = ({ valuationData, stockData, companyData }) => {
  if (!valuationData && !stockData && !companyData) return null;

  return (
    <div className="dashboard-grid">
      
    </div>
  );
};

export default Dashboard;
