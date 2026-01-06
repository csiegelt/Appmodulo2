import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 16h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V19z"/>
  </svg>
);

const ServicesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export function NavMenu() {

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  

  return (
    <>
      {/* Overlay oscuro */}
      {isOpen && (
        <div 
          className="nav-overlay" 
          onClick={closeMenu}
        ></div>
      )}
      
      <nav className="nav-menu" ref={navRef}>
        <div className="nav-container">
        <Link to="/" className="nav-logo">
          <HomeIcon />
          Propiedades Chiloé
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
              <HomeIcon />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/properties" onClick={closeMenu}>
              <BuildingIcon />
              Propiedades
            </Link>
          </li>
          <li>
            <Link to="/servicios" onClick={closeMenu}>
              <ServicesIcon />
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeMenu}>
              <ContactIcon />
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
}