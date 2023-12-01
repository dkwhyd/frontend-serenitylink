import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function TopBar() {
  const auth = useSelector((state) => state.auth);
  return (

    <>
      <div>
        <Link to={auth.user ? '/account' : '/login'} className='flex flex-row'>
          {auth.user?.name}
          <button className='p-2 '>
            <FaUser />
          </button>
        </Link>
      </div>
    </>
  );
}
