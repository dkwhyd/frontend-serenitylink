import { Routes, Route } from 'react-router-dom';
import ListReport from '../../components/ListReport';
import Sidebar from '../../components/sideBar';
import TopBar from  '../../components/topBar';
import menus from '../menus';
import Report from '../Report';
export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <TopBar />

      <div className="flex flex-row">
        <Sidebar menus={menus} />

        <Routes>
        <Route path="*" element={<ListReport />} />

          <Route path="report/*" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}
