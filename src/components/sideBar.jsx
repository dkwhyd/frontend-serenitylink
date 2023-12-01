// src/components/Sidebar.js
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ menus }) => {
  return (
    <aside className="bg-gray-800 text-white p-4 w-32 h-full top-0 sticky ">
      <ul>
        {menus.map((menu) => (
          <NavLink
            to={menu.route}
            key={menu.id}
            className="flex items-center mb-4"
          >
            <img src={menu.icon} alt={menu.label} className="mr-2 w-4" />
            {menu.label}
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  menus: PropTypes.array,
};

export default Sidebar;
