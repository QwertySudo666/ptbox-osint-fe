import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Scans from './pages/Scans';
import Findings from './pages/Findings';
import ScanDetails from './pages/ScanDetails';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Scans />} />
          <Route path="scans" element={<Scans />} />
          <Route path="findings" element={<Findings />} />
          <Route path="scans/:id" element={<ScanDetails />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);