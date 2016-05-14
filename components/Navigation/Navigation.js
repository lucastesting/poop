/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import './Navigation.scss';
import Link from '../Link';

const NavLink = ({ href, children }) => {
  return (
  <li className="Navigation-item">
    <a className="Navigation-link" href={href} onClick={Link.handleClick}>{children}</a>
  </li>
  )
}

function Navigation() {
  return (
    <ul className="Navigation" role="menu">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/blog">Blog</NavLink>
    </ul>
  );
}

export default Navigation;
