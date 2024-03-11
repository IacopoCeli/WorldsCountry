import React from 'react';
import './Header.css';
import logoMini from '../../files/logo/logo-mini.png';
import logoMiniDark from '../../files/logo/logo-mini (dark).png';


export default function Header() {
  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logoMiniDark} alt="Logo" width="70" className="d-inline-block align-text-top" />
          </a>
        </div>
      </nav>
    </>
  );
}
