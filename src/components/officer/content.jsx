/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GuardRoute from '../guardRoute';
import DetailReport from '../detailReport';
import ListReport from '../ListReport';
import SearchAndListReport from './searchAndListReport';

export default function ContentOfficer() {
  const auth = useSelector((state) => state.auth);
  const idUser = auth.user._id;
  const unitWork = auth.user.unitWork;

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <GuardRoute
            element={
              <SearchAndListReport
                title="Laporan Unit Kerja"
                url={`/officer/report/${auth.user.unitWork}`}
              />
            }
          />
        }
      />
      <Route
        path="/report"
        element={
          <GuardRoute
            element={
              <SearchAndListReport
                title="Laporan Unit Kerja"
                url={`/officer/report/${auth.user.unitWork}`}
              />
            }
          />
        }
      />
      <Route
        path="/report/my"
        element={
          <GuardRoute
            element={
              <SearchAndListReport
                title="Laporan Saya"
                url={`/officer/report/my/${auth.user._id}`}
              />
            }
          />
        }
      />
      <Route
        path="/report/detail/:id"
        element={<GuardRoute element={<DetailReport />} />}
      />
    </Routes>
  );
}
