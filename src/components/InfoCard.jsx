import React from 'react';

const InfoCard = ({ icon: Icon, title, data, isRawJson = false }) => {
  // Helper to format values elegantly
  const formatValue = (key, value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    
    // Check if it looks like a number that should have styling
    const strVal = String(value);
    let className = "data-value";
    
    if (strVal.includes('%') || strVal.toLowerCase().includes('profit') || strVal.toLowerCase().includes('buy')) {
      if (!strVal.includes('-')) className += " success";
    }
    if (strVal.includes('-') && (strVal.includes('%') || strVal.includes('Loss'))) {
      className += " error";
    }
    
    return <span className={className}>{strVal}</span>;
  };

  return (
    <div className="glass-panel info-card">
      <div className="card-header">
        <div className="card-icon">
          <Icon size={24} />
        </div>
        <h3 className="card-title">{title}</h3>
      </div>
      
      <div className="card-content">
        {isRawJson ? (
          <div className="json-view">
            {JSON.stringify(data, null, 2)}
          </div>
        ) : (
          Object.entries(data).map(([key, value]) => (
            <div className="data-row" key={key}>
              <span className="data-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              {formatValue(key, value)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InfoCard;
