import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <header className="flex flex-wrap justify-between flex-col md:flex-row bg-white text-blue-400 shadow p-5  text-center sticky top-0 z-40">
      <div className="mb-0 flex-none center">
        <span className="font-bold text-xl">SerenityLink</span>
      </div>
      <nav>
        <ul className="flex flex-wrap flex-row justify-around  w-full align ">
          <li className="p-1 px-3">Alur Aduan</li>
          <li className="p-1 px-3">Kategori</li>
          <li className="p-1 px-3">Daftar Laporan</li>

          <Link
            to={auth.user ? '/dashboard' : '/login'}
            className=" py-1 px-3 bg-green-500 p-1 rounded text-white"
          >
            {auth.user ? 'Dashboard' : 'Masuk'}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
