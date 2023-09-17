import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import navigation from '../../navigation';
import s from './index.module.css';

function Layout() {
  return (
    <>
      <Header navigation={navigation} />
      <main className={s.mainSection}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
