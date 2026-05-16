import React, { useState, useEffect } from 'react';
import { useSearch } from './SearchContext';
import Loader from './Loader';
import InfoCard from './InfoCard';
import { Building2, ListChecks, AlertCircle } from 'lucide-react';

const CompanyDetails = () => {
    const { searchQuery } = useSearch();

    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fundamentalData, setFundamentalData] = useState(null);

    const fetchCompanyData = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/company/${searchQuery}`);
        if (!response.ok) {
            const fallbackResponse = await fetch(`http://localhost:3000/api/v1/StockData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ StockData: searchQuery }),
            });
            if (!fallbackResponse.ok) {
                throw new Error('Company not found');
            }
            const data = await fallbackResponse.json();
            setCompanyData(data);
            return;
        }
        const data = await response.json();
        setCompanyData(data);
    };

    const fetchFundamental = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/expert-valuation/${searchQuery}`);
        if (!response.ok) {
            throw new Error('Failed to fetch fundamental data');
        }
        const data = await response.json();
        setFundamentalData(data);
    };

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            setError(null);
            setCompanyData(null);
            setFundamentalData(null);
            
            Promise.allSettled([fetchCompanyData(), fetchFundamental()]).then((results) => {
                const [companyResult, fundamentalResult] = results;
                if (companyResult.status === 'rejected' && fundamentalResult.status === 'rejected') {
                    // Only show error if both fail
                    setError(new Error(companyResult.reason.message));
                }
                setLoading(false);
            });
        }
    }, [searchQuery]);

    // Prepare data for InfoCard display
    let filteredCompanyData = null;
    if (companyData?.data?.company) {
        filteredCompanyData = Object.fromEntries(
            Object.entries(companyData.data.company).filter(([key]) => key !== 'company_id')
        );
    }

    let checklistData = null;
    if (fundamentalData?.data?.checklist) {
        checklistData = fundamentalData.data.checklist;
    }

    if (!searchQuery) return null;

    return (
        <div style={{ marginTop: '32px' }}>
            {loading && <Loader text={`Fetching details for "${searchQuery}"...`} />}
            
            {error && (
                <div className="error-message">
                    <AlertCircle size={20} />
                    <span>Error: {error.message}</span>
                </div>
            )}
            
            {!loading && (
                <div className="dashboard-grid">
                    {filteredCompanyData && (
                        <InfoCard 
                            icon={Building2} 
                            title="Company Overview" 
                            data={filteredCompanyData} 
                        />
                    )}
                    {checklistData && (
                        <InfoCard 
                            icon={ListChecks} 
                            title="Fundamental Analysis" 
                            data={checklistData} 
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default CompanyDetails;