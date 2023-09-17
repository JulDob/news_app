import React from 'react';
import PropTypes from 'prop-types';
import Icons from './icons.svg';

const SvgIcon = ({ name, color, size }) => (
  <svg fill={color} width={size} height={size}>
    <use xlinkHref={`${Icons}#${name}`} />
  </svg>
);

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

SvgIcon.defaultProps = {
  color: '#000',
  size: 20,
};

export default SvgIcon;
