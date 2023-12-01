// src/components/RegisterForm.js
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingButton from './floatingButton';

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
    <div>
      {/* <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white">
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
    </div> */}
    {/* sansryke */}
    <section className="bg-gradient-calm-elegant min-h-screen">
      <FloatingButton />
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="my-5 w-full rounded-lg bg-white shadow sm:max-w-md xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Create an account</h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => handleChange(e, 'name')}
                    className='focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 sm:text-sm'
                    placeholder="masukan nama anda"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                  email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className='focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 sm:text-sm'
                    placeholder="masukan email anda"
                    required={true}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                    password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => handleChange(e, 'password')}
                    className='focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 sm:text-sm'
                    placeholder=""
                    required={true}
                    autoComplete='off'
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-900">
                    confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange(e, 'confirmPassword')}
                    className='focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 sm:text-sm'
                    placeholder=""
                    required={true}
                    autoComplete='off'
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-3"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default RegisterForm;
