import React, { useState } from 'react';

export default function NewScanForm({ onSubmit, onCancel }) {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim()) {
      onSubmit(domain);
      setDomain('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      {/* <div style={{ width: '100%', margin: '0 auto' }}> */}
        <input
          type="text"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          style={{
            width: '90%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      {/* </div> */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Start Scan
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}