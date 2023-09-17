import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './index.module.css';

function Container({ children, size }) {
  return (
    <div
      className={cn(s.container, {
        [s.md]: size === 'md',
        [s.lg]: size === 'lg',
      })}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
};

Container.defaultProps = {
  size: 'md',
};

export default Container;
