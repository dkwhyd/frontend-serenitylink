// src/components/LoginForm.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../api/auth';
import { userLogin } from '../../features/Auth/actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    // const login = await axios.post(
    //   `${import.meta.env.VITE_API_HOST}/login`,
    //   form,
    // );

    let { data } = await login(form.email, form.password);
    console.log(data);
    let { user, token } = data;
    dispatch(userLogin(user, token));

    // console.log(login);
    if (data.status === 'ok') {
      navigate('/dashboard');
    } else {
      window.alert(data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg bg-white">
      <Link to="/" className="flex items-center mb-4 text-blue-500">
        Back to Home
      </Link>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 p-2 w-full border rounded-md"
            required
            autoComplete="on"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Login
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-500">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
