import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Article from './pages/Article';
import Layout from './components/Layout';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import Gallery from './components/Gallery/Gallery';
import Home from './pages/Home';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import RestorePassword from './pages/RestorePassword';
import Login from './pages/Login';
import ProtectedRoute from './PrivateRoute';
import useAuth from './useAuth';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const background = location.state;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/restore-password" element={<RestorePassword />} />
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path=":categoryId">
            <Route index element={<Category />} />
            <Route path=":newsId">
              <Route index element={<Article />} />
              <Route path="image" element={<Gallery />} />
            </Route>
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Routes>{background && <Route path="image" element={<Gallery />} />}</Routes>
    </>
  );
}

export default App;
