// src/components/RegisterForm.js
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      window.alert('password must be same');
    }

    try {
      const register = await axios.post(
        `${import.meta.env.VITE_API_HOST}/register`,
        form,
      );
      console.log(register.data);
      if(register.data.status==='ok'){
        window.alert(register.data.message)
        navigate('/login')
      }
    } catch (err) {
      window.alert('Error! please check your connection');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white">
      <Link to="/" className="flex items-center mb-4 text-blue-500">
        Back to Home
      </Link>
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => handleChange(e, 'name')}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
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
            onChange={(e) => handleChange(e, 'email')}
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
            onChange={(e) => handleChange(e, 'password')}
            className="mt-1 p-2 w-full border rounded-md"
            required
            autoComplete="on"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => handleChange(e, 'confirmPassword')}
            className="mt-1 p-2 w-full border rounded-md"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Register
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-blue-500">
            Masuk sekarang
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
