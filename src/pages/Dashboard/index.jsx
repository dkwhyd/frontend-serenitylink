/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/dashboard/dashboardLayout';
import axios from 'axios';
import ContentUser from '../../components/user/content';
import ContentAdmin from '../../components/admin/content';
export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  let dashboardContent = null;

  const getMe = async () => {
    const { data } = await axios.get('http://localhost:5500/me', {
      headers: {
        Authorization: `Bearer ${auth.user ? auth.token : ''}`,
      },
    });
    // console.log(data.role);

    return data;
  };
  useEffect(() => {
    getMe();
  }, []);

  switch (auth.user.role) {
    case 'user':
      console.log('tampilkan halaman user');
      dashboardContent = <ContentUser />;
      break;
    case 'officer':
      console.log('tampilkan halaman officer');
      dashboardContent = <ContentOfficer />;
      break;

    case 'admin':
      console.log('tampilkan halaman admin');
      dashboardContent = <ContentAdmin />;
      break;

    default:
      console.log('role tidak terdaftar hapus data user');
      // dashboardContent = <Navigate to="/logout" />;
      dashboardContent = <Navigate to="/" />;
      break;
  }

  return (
    <>
      <DashboardLayout>{dashboardContent}</DashboardLayout>
    </>
  );
}
