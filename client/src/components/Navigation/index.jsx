import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './index.module.css';
import AuthNavigation from '../AuthNavigation';

function Navigation({ navigationList }) {
  return (
    <nav className={s.navContainer}>
      <ul className={s.navList}>
        {navigationList.map(({ label, url, id }) => (
          <li className={s.navItem} key={`${label}-${url}`}>
            <NavLink
              className={({ isActive }) => cn(s.navItemLink, { [s.navItemActive]: isActive })}
              to={`/${id}`} // `/${id}`
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <AuthNavigation />
    </nav>
  );
}

Navigation.propTypes = {
  navigationList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default Navigation;
