import React from 'react';
import './Header.css';
import { GlobeAmericas } from 'react-bootstrap-icons';


export default function Header() {
  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body">
        <div className="container-fluid">
          <GlobeAmericas style={{fontSize: "50px", color:"white"}} />
        </div>
      </nav>
    </>
  );
}
