import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './header.css'

const Header = (props) => {
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("account");
    const logged = localStorage.getItem("isLoggedIn") === "true";

    if (stored && logged) {
      setAccount(JSON.parse(stored));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className={`header-container1 ${props.rootClassName}`}>
      <nav id="header" aria-label="Main header" className="header">
        <div className="header__container">

          {/* Logo */}
          <Link to="/">
            <div aria-label="GatorMarket Home" className="header__logo">
              <span className="header__logo-text">GatorMarket</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="header__links">
            <Link to="/listings">
              <div className="header__link"><span>Browse Listings</span></div>
            </Link>

            <Link to="/create-listing">
              <div className="header__link"><span>Sell Items</span></div>
            </Link>

            <Link to="/how-it-works">
              <div className="header__link"><span>How It Works</span></div>
            </Link>

            <Link to="/safety">
              <div className="header__link"><span>Safety Tips</span></div>
            </Link>

            <Link to="/contact">
              <div className="header__link"><span>Contact</span></div>
            </Link>
          </div>

          {/* Right-side actions */}
          <div className="header__actions">

            {/* Always visible search icon */}
            <button aria-label="Search listings" className="header__icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21 21l-4.34-4.34"></path>
                  <circle r="8" cx="11" cy="11"></circle>
                </g>
              </svg>
            </button>

            {/* Logged-in view */}
            {isLoggedIn ? (
              <>
                <Link to="/account" aria-label="Account" className="header__icon-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle r="4" cx="12" cy="7"></circle>
                    </g>
                  </svg>
                </Link>

                <span className="header__username">
                  {account?.username || account?.email}
                </span>

                <button onClick={handleLogout} className="btn-secondary btn">
                  Logout
                </button>
              </>
            ) : (
              /* Logged-out view */
              <>
                <Link to="/signup" className="btn-primary btn">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.defaultProps = {
  rootClassName: '',
};

Header.propTypes = {
  rootClassName: PropTypes.string,
};

export default Header;
