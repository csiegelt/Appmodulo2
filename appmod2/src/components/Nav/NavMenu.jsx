import React, { useState } from "react";
import { Link } from "react-router-dom";

export function NavMenu() {

  const [isOpen, setIsOpen] = useState(false);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="nav-menu">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Propiedades
        </Link>

        <button
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/properties" onClick={closeMenu}>
              Propiedades
            </Link>
          </li>
          <li>
            <Link to="/servicios" onClick={closeMenu}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}