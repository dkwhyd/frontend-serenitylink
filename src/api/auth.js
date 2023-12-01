import axios from 'axios';

export async function registerUser(data) {
  return await axios.post(`${import.meta.env.VITE_HOST_API}/register`, data);
}

export async function login(email, password) {
  return await axios.post(`${import.meta.env.VITE_HOST_API}/login`, {
    email,
    password,
  });
}

export async function logout() {
  const token = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios
    .post(`${import.meta.env.VITE_HOST_API}/logout`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      localStorage.removeItem('auth');
      return response;
    });
}
