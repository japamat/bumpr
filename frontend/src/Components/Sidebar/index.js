import React from 'react';

import NavBar from './NavBar';
import SidebarLink from './SidebarLink';

function Header() {
  return (
    <div>
      <NavBar>
        <SidebarLink to="/home">
          home
        </SidebarLink>
      </NavBar>
    </div>
  );
}

export default Header;
