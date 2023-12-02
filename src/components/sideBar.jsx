import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ menus }) => {
  const auth = useSelector((state) => state.auth);
  // console.log(menus);
  const userMenus = menus.find((menu) => menu[auth.user.role]);
  console.log(userMenus);
  return (
    <>
      <ul className="w-full space-y-2 font-medium">
        <li>
          <div className="bg-[#1A2226] p-3">
            <p className="mx-2 text-xs font-semibold text-slate-400 uppercase">
              Menu Utama
            </p>
          </div>
        </li>
        {userMenus &&
          userMenus[auth.user.role].map((menu) => (
            <li key={menu.id}>
              <NavLink
                to={menu.route}
                className="w-full group flex items-center p-2 text-gray-400 hover:bg-[#1E282C] hover:border-l-2 hover:border-primary-500 transition ease-in duration-75"
              >
                <svg
                  className="ml-2 h-5 w-5  text-gray-400 transition duration-75 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d={menu.icon} />
                </svg>
                <span className="ml-3 text-center group-hover:text-white capitalize">
                  {menu.label}
                </span>
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};

Sidebar.propTypes = {
  menus: PropTypes.array,
};

export default Sidebar;
