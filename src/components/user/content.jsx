/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom';
import SearchAndListReport from './searchAndListReport';
import DashboardLayout from '../dashboard/dashboardLayout';
import Report from '../../pages/Report';

export default function ContentUser() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path='*' element={<SearchAndListReport />} />
        <Route path='report/*' element={<Report />} />
      </Routes>
    </DashboardLayout>
  );
}
