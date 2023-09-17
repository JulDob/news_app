import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import s from './Gallery.module.css';

function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => navigate(-1);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleClick}
        className={s.back}
        aria-label="Close window"
      />
      <img src={searchParams.get('src')} className={s.modal} alt="" />
    </>
  );
}

export default Gallery;
