/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/dashboardLayout';
import axios from 'axios';
import ContentUser from '../../components/user/content';
import ContentOfficer from '../../components/officer/content';
import ContentAdmin from '../../components/admin/content';

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);

  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  let dashboardContent = null;

  const getMe = async () => {
    try {
      const { data } = await axios.get('http://localhost:5500/me', {
        headers: {
          Authorization: `Bearer ${auth.user ? auth.token : ''}`,
        },
      });
      setRole(data.role);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const roleComponents = {
    user: <ContentUser />,
    officer: <ContentOfficer />,
    admin: <ContentAdmin />,
  };

  dashboardContent = roleComponents[role] || <Navigate to="/" />;

  return (
    <>
      <DashboardLayout>
        {loading ? <p>Loading...</p> : dashboardContent}
      </DashboardLayout>
    </>
  );
}
