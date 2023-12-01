import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <header>
      <nav className='bg-transparent '>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <div className='flex items-center'>
            <div className=''>
              <img src='/logo2.jpg' className='mr-3 md:h-10 h-8 w-auto rounded-full' alt='Logo SerenityLink' />
            </div>
            <span className='self-center whitespace-nowrap text-lg md:text-2xl font-semibold'>SerenityLink</span>
          </div>
          <button
            onClick={toggleNavbar}
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  md:hidden'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'} z-10`} id='navbar-default'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-transparent p-4 font-medium  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 '>
              <li>
                <Link href='#' className='font-semibold block rounded bg-blue-700 py-2 pl-3 pr-4 text-white  md:bg-transparent md:p-0 md:text-blue-700 ' aria-current='page'>
                  Home
                </Link>
              </li>
              <li>
                <a href='#alurAduan' className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 '>
                  Alur Aduan
                </a>
              </li>
              <li>
                <a href='#kategori' className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 '>
                  Kategori
                </a>
              </li>
              <li>
                <a href='#laporan' className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 '>
                  Laporan
                </a>
              </li>
              <li>
                <Link to={auth.user? '/dashboard': '/login'} className='font-semibold block rounded py-2 pl-3 pr-4 text-gray-950 hover:bg-gray-100 transition duration-300  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 underline '>
                  {auth.user? 'Dashboard': 'Login'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
