/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchAndListReport from './searchAndListReport';
import DashboardLayout from '../dashboard/dashboardLayout';
import GuardRoute from '../guardRoute';
import DetailReport from '../detailReport';
import NewReport from '../newReport';

export default function ContentUser() {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/*"
        element={<GuardRoute element={<SearchAndListReport />} />}
      />
      <Route
        path="/report/new"
        element={<GuardRoute element={<NewReport />} />}
      />
      <Route
        path="/report/detail/:id"
        element={<GuardRoute element={<DetailReport />} />}
      />
    </Routes>
  );
}
