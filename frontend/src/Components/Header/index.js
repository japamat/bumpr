import React from 'react';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

function Header() {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/home">
          home
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
