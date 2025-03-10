import { useState, useEffect } from 'react';
import api from '../services/api';

export function useScanDetails(id) {
  const [scan, setScan] = useState(null);
  const [findings, setFindings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchScanDetails = async () => {
      try {
        const response = await api.get(`/scans/${id}`);
        setScan(response.data);
      } catch (error) {
        console.error('Error fetching scan details:', error);
      }
    };
    fetchScanDetails();
  }, [id]);

  useEffect(() => {
    const fetchFindings = async () => {
      try {
        const response = await api.post(
          '/findings',
          { scanId: id },
          {
            params: {
              page: page,
              size: 10,
            },
          }
        );
        setFindings(response.data.content);
        setTotalPages(response.data.page.totalPages);
      } catch (error) {
        console.error('Error fetching findings:', error);
      }
    };
    fetchFindings();
  }, [id, page]);

  return { scan, findings, page, totalPages, setPage };
}