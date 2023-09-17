import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryHandler from './api';

const AuthContext = createContext({});

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  //   const getToken = () => {
  //     localStorage.getItem('accessToken');
  //   };
  const setToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('accessToken');
  };
  // We are using `react-router` for this example,
  // but feel free to omit this or use the
  // router of your choice.
  const navigate = useNavigate();
  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    QueryHandler.fetchMe()
      .then((data) => setUser(data.user))
      .catch((_error) => console.log(_error))
      .finally(() => setLoadingInitial(false));
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  function login(email, password) {
    setLoading(true);

    QueryHandler.login(email, password)
      .then((data) => {
        setUser(data.user);
        setToken(data.accessToken);
        navigate('/');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function register(email, password) {
    setLoading(true);

    QueryHandler.register(email, password)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  function forgotPassword(email) {
    setLoading(true);

    QueryHandler.forgotPassword(email)
      .then(() => {
        navigate('/');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  function restorePassword(password1, password2, token) {
    setLoading(true);

    QueryHandler.restorePassword(password1, password2, token)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {
    QueryHandler.logout().then(() => {
      setUser(undefined);
      removeToken();
    });
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      restorePassword,
      forgotPassword,
      logout,
    }),
    [user, loading, error],
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
