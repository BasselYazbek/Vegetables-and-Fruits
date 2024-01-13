import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import star from '../src/Images/star-k-logo.png';

const Nav = () => {
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleMenuItemClick = () => {
    handleDropdownClose();
    // Scroll to the top of the page whenever a menu item is clicked
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Close the dropdown when the location changes (e.g., when a menu item is clicked)
    handleDropdownClose();
  }, [location.pathname]);

  return (
    <>
      <nav id="header-nav" className="navbar navbar-expand-lg navbar-light">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">
            <div className="d-none d-sm-block" id="logo-img"></div>
            <div>
              <h1>Sivedco Supermarket</h1>
              <p className="tagline">
                <img src={star} alt="Kosher certification" />
                <span>Fresh Fruits and Vegetables</span>
              </p>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsable-nav"
            aria-controls="collapsable-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleDropdownToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`} id="collapsable-nav">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                <Link to="/" className="nav-link" onClick={handleMenuItemClick}>
                  <span className="bi bi-house-door"></span> Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleDropdownToggle}
                >
                  <span className="bi bi-glass"></span> Menu
                </a>
                <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                  <Link to="/fruits" className="dropdown-item" onClick={handleMenuItemClick}>
                    Fruits
                  </Link>
                  <Link to="/vegetables" className="dropdown-item" onClick={handleMenuItemClick}>
                    Vegetables
                  </Link>
                  <Link to="/herbs" className="dropdown-item" onClick={handleMenuItemClick}>
                    Herbs
                  </Link>
                  <Link to="/items_on_discount" className="dropdown-item" onClick={handleMenuItemClick}>
                    Items on Discount
                  </Link>
                </div>
              </li>
              <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                <Link to="/about" className="nav-link" onClick={handleMenuItemClick}>
                  <span className="bi bi-info-circle"></span> About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/menu" className="nav-link" onClick={handleMenuItemClick}>
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link" onClick={handleMenuItemClick}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="tel:25-302283">
                  <span className="bi bi-telephone"></span>25-302283
                </a>
                <div className="we-deliver">* We Deliver</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
