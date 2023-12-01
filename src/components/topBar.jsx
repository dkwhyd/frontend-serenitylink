import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="h-10 flex justify-between flex-cols px-10 bg-gray-100 top-0 sticky z-40">
      <div>
        <h3>SerenityLink</h3>
      </div>

      <div>
        <Link to={auth.user ? '/account' : '/login'} className="flex flex-row">
          {auth.user?.name}
          <button className="p-2 ">
            <FaUser />
          </button>
        </Link>
      </div>
    </div>
  );
}
