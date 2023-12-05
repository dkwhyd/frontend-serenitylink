import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="relative">
        <div
          className="flex flex-row text-center items-center text-white cursor-pointer"
          onClick={handleToggleDropdown}
        >
          {auth.user?.name}
          <button className="p-2 ">
            <FaUser />
          </button>
        </div>
        {isDropdownOpen && (
          <div className="absolute bg-white p-2 rounded shadow mt-2 z-40">
            <div className="flex flex-row">
              <Link
                to={'/logout'}
                className="block w-full text-left text-red-500 font-bold"
              >
                <FiLogOut />
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
