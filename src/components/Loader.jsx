import React from 'react';

const Loader = ({ text = "Loading data..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default Loader;
