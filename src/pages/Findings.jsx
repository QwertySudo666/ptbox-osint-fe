import React from 'react';
import { Link } from 'react-router-dom';

export default function Findings() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '20px' }}>
      <h1>Findings</h1>
      <Link to="/scans" style={{ textDecoration: 'none', color: '#007bff', fontSize: '16px' }}>
        ← Go to Scans
      </Link>
      <p>Here will be the scan results.</p>
    </div>
  );
}