import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import CompanyDetails from './components/CompanyDetails';
import { fetchValuation, postStockData, fetchCompanyData } from './services/api';
import { SearchContextProvider } from './components/SearchContext';

function App() {

  const handleSearch = (companyName) => {
    console.log("Company Searched :",companyName);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Stock Analyzer</h1>
        <p>Real-time valuation, market data, and company insights.</p>
      </header>

      <main>
        <SearchContextProvider>
          <SearchBar />
          <CompanyDetails />
        </SearchContextProvider>
      </main>
      <footer style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '15px', marginBottom: '15px'}}>
        <p style={{color: 'red', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>This is application is only made for learning purpose so please do your own research before making any investment decisions.</p>
        <p style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>Stock Analyzer © 2026</p>
      </footer>
    </div>
  );
}

export default App;
