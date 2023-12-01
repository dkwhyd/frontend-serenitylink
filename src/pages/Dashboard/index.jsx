import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardUser from '../../components/dashboardUser';
import Login from '../../components/loginForm';

import Sidebar from '../../components/sideBar';
import TopBar from  '../../components/topBar';
import menus from '../menus';
import Report from '../../components/newReport';
export default function Dashboard() {
  const auth = useSelector(state=>state.auth)
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <TopBar />

      <div className="flex flex-row h-100">
        <Sidebar menus={menus} />

        <Routes>
        <Route path="/*" element={auth.user?<DashboardUser/> : <Login/>  } />

          <Route path="report/new" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}
