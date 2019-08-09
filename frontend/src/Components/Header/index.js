import React from 'react';

import A from '../A';
import Img from '../Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

function Header() {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/">
          Nav text root
        </HeaderLink>
        <HeaderLink to="/features">
          nav text features
        </HeaderLink>
        <HeaderLink to="/slogans">
          nav text slogans
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
