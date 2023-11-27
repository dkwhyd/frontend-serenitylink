import { Routes, Route, NavLink } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import menus from '../menus';
import Report from '../Report';
export default function Dashboard() {
  return (
    <div className="flex">
      <br />
      <Sidebar menus={menus} />

      <Routes>
        <Route path="*" element={<div>dashboard</div>} />
        <Route path="report/*" element={<Report />} />
      </Routes>
    </div>
  );
}
