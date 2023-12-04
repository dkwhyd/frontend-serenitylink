import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogoout } from '../features/Auth/actions';

import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function logout() {
      const token = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      return await axios
        .post(`http://localhost:5500/logout`, null, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          localStorage.removeItem('auth');
          return response;
        });
    }
    
    logout()
      .then(() => dispatch(userLogoout()))
      .then(() => navigate('/'));
  }, []);

  return <></>;
}
