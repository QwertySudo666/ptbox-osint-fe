import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScanDetails } from '../hooks/useScanDetails';
import api from '../services/api';
import {
  Container,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  PaginationContainer,
  PageInfo,
} from '../styles/ScanDetailsStyles';

export default function ScanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scan, findings, page, totalPages, setPage } = useScanDetails(id);

  const stopScan = async () => {
    try {
      console.log('BLABLABLA')
      await api.get(`/scans/${id}/stop`);
      alert(`Scan ${id} stopped!`);
      navigate('/scans');
    } catch (error) {
      console.error('Error stopping scan:', error);
    }
  };

  if (!scan) return <div>Loading...</div>;

  return (
    <Container>
      <Button onClick={() => navigate('/scans')}>← Back to Scans</Button>
      <h1>Scan Details</h1>
      <Button danger onClick={stopScan}>
        Stop Scan
      </Button>
      <h2>Findings</h2>
      <div
        style={{
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHeader>
            <tr>
              <th>Type</th>
              <th>FQDN</th>
              <th>IP Address</th>
              <th>DNS Type</th>
              <th>DNS Value</th>
              <th>ASN</th>
              <th>Netblock</th>
            </tr>
          </TableHeader>
          <tbody>
            {findings.map((finding, index) => (
              <TableRow key={finding.id} even={index % 2 === 0}>
                <TableCell>{finding.type}</TableCell>
                <TableCell>{finding.fqdn || '-'}</TableCell>
                <TableCell>{finding.ipAddress || '-'}</TableCell>
                <TableCell>{finding.dnsType || '-'}</TableCell>
                <TableCell>{finding.dnsValue || '-'}</TableCell>
                <TableCell>{finding.asn || '-'}</TableCell>
                <TableCell>{finding.netblock || '-'}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>

      <PaginationContainer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </Button>
        <PageInfo>
          Page {page + 1} of {totalPages}
        </PageInfo>
        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1 || totalPages === 0}>
          Next
        </Button>
      </PaginationContainer>
    </Container>
  );
}