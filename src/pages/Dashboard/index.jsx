/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../components/loginForm';
import DashboardLayout from '../../components/dashboard/dashboardLayout';
import Report from '../../components/newReport';
import DetailReport from '../../components/detailReport';
import SearchAndListReport from '../../components/user/searchAndListReport';
export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path='/*' element={auth.user ? <SearchAndListReport /> : <Navigate to='/login' />} />
          <Route path='/*' element={<SearchAndListReport />} />
          <Route path='report/new' element={<Report />} />
          <Route path='report/detail/:id' element={auth.user ? <DetailReport /> : <Navigate to='/login' />} />
        </Routes>
      </DashboardLayout>
    </>
  );
}
