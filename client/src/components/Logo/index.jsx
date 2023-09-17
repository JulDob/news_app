import React from 'react';
import { Link } from 'react-router-dom';
import s from './index.module.css';

function Logo() {
  return (
    <Link className={s.link} to="/">
      m.
      <span className={s.logo}>news</span>
    </Link>
  );
}

export default Logo;
