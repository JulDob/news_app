import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Navigation from '../Navigation';
import Container from '../Container';
import s from './index.module.css';

function Header({ navigation }) {
  const navigationList = Object.values(navigation);

  return (
    <header>
      <Container>
        <div className={s.container}>
          <Logo />
          <Navigation navigationList={navigationList} />
        </div>
      </Container>
    </header>
  );
}

Header.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default Header;
