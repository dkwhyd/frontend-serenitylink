import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex flex-wrap flex-col md:flex-row bg-white text-blue-400 shadow p-5  center sticky top-0 z-40">
      <div className="mb-0 flex-none center">
        <span className="font-bold text-xl">SerenityLink</span>
      </div>
      <nav className="flex-none">
        <ul className="flex flex-row center  p-1 ">
          <li>Alur Aduan</li>
          <li>Kategori</li>
          <li>Daftar Laporan</li>

          <Link to="/login" className="bg-green-500 p-1 rounded text-white">
            Sign in
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
