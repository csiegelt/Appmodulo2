import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    </>
  );
}