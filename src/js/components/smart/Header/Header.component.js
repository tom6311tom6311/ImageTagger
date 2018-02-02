import React from 'react';
import { Link } from 'react-router-dom';

require('./Header.styl');

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link className="navLink" to="/">Home</Link></li>
        <li><Link className="navLink" to="/tagger">Tagger</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
