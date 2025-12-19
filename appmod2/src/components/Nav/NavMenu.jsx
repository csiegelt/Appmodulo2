import React, { useState } from "react";

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
        <a href="/" className="nav-logo">
          Propiedades
        </a>

        <button
          className="nav-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <a href="#inicio" onClick={closeMenu}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#cabanas" onClick={closeMenu}>
              Cabañas
            </a>
          </li>
          <li>
            <a href="#servicios" onClick={closeMenu}>
              Servicios
            </a>
          </li>
          <li>
            <a href="#contacto" onClick={closeMenu}>
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}