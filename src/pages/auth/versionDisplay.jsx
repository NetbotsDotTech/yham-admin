/* eslint-disable prettier/prettier */
// src/VersionDisplay.js
import React from 'react';

const VersionDisplay = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      backgroundColor: '#fff',
      padding: '5px 10px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    }}>
      <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
        Version: {import.meta.env.VITE_APP_VERSION}
      </p>
    </div>
  );
};

export default VersionDisplay;
