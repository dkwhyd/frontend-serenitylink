/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GuardRoute from '../guardRoute';
import Main from './main';
import SearchAndListReport from './searchAndListReport';
import Kategori from './kategori';
import NewKategori from './newKategori';

export default function ContentOfficer() {
  const auth = useSelector((state) => state.auth);
  const idUser = auth.user._id;
  const unitWork = auth.user.unitWork;

  return (
    <Routes>
      <Route path='/*' element={<GuardRoute element={<Main />} />} />
      <Route path='/report' element={<GuardRoute element={<SearchAndListReport />} />} />
      <Route path='/category' element={<GuardRoute element={<Kategori />} />} />
      <Route path='/category/new' element={<GuardRoute element={<NewKategori />} />} />
    </Routes>
  );
}
