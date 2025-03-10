import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import NewScanForm from '../components/NewScanForm';

export default function Scans() {
  const [scans, setScans] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await api.get('/scans');
        setScans(response.data);
      } catch (error) {
        console.error('Error fetching scans:', error);
      }
    };
    fetchScans();
  }, []);

  const startScan = async (domain) => {
    try {
      const response = await api.post('/scans', { domain });
      setScans([...scans, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating scan:', error);
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'FINISHED':
        return 'Completed';
      case 'FAILED':
        return 'Failed';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'IN_PROGRESS':
        return '#007bff';
      case 'FINISHED':
        return '#28a745';
      case 'FAILED':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '20px' }}>
      <h1>Scans</h1>

      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        New Scan
      </button>


      {scans.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>No scans available. Start a new scan!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {scans.map((scan) => (
            <Link to={`/scans/${scan.id}`} key={scan.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{
                  border: `2px solid ${getStatusColor(scan.status)}`,
                  borderRadius: '8px',
                  padding: '20px',
                  width: '200px',
                  height: '200px',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.borderColor = `${getStatusColor(scan.status)}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = getStatusColor(scan.status);
                }}
              >
                <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>{scan.domain}</h3>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>
                  <strong>Started:</strong> {new Date(scan.startTime).toLocaleString()}
                </p>
                {scan.endTime && (
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Finished:</strong> {new Date(scan.endTime).toLocaleString()}
                  </p>
                )}
                <p style={{ margin: '5px 0', fontSize: '14px', color: getStatusColor(scan.status) }}>
                  Status: {formatStatus(scan.status)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}


      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '300px',
              textAlign: 'center',
            }}
          >
            <h2>New Scan</h2>
            <NewScanForm onSubmit={startScan} onCancel={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}