import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Login from '../../components/loginForm';
import DashboardLayout from '../../components/dashboard/dashboardLayout';
import Report from '../../components/newReport';
import DetailReport from '../../components/detailReport';
import SearchAndListReport from '../../components/user/searchAndListReport';
export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  return (
    <DashboardLayout>
      <Routes>
        <Route path='/*' element={auth.user ? <SearchAndListReport /> : <Login />} />
        <Route path='report/new' element={<Report />} />
        <Route path='report/detail/:id' element={<DetailReport />} />
      </Routes>
    </DashboardLayout>
  );
}
