import { NavLink, Route, Routes } from 'react-router-dom';

export default function Report() {
  return (
    <div>
      <h3>halaman report</h3>
      <div className="menus">
        <NavLink to="new">Tambah laporan</NavLink>
      </div>
      <Routes>
        <Route path="new" element={<div>form laporan</div>} />
      </Routes>
    </div>
  );
}
