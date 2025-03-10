import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Poppins, sans-serif';
  padding: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'Poppins, sans-serif';
  background-color: ${(props) => (props.danger ? '#dc3545' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

export const TableHeader = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

export const TableRow = styled.tr`
  background-color: ${(props) => (props.even ? '#f9f9f9' : '#fff')};
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const PageInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
`;