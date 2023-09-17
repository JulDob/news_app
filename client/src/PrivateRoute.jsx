import * as React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ user, roles, children, redirectPath }) => {
  const isAllowed = !!user && roles.includes(user.role);

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  roles: ['user', 'admin', 'manager'],
  redirectPath: '/',
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
