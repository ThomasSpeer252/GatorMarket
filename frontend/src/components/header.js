import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './header.css'

const Header = (props) => {
  return (
    <div className={`header-container1 ${props.rootClassName} `}>
      <nav id="header" aria-label="Main header" className="header">
        <div className="header__container">
          <a href="/">
            <div aria-label="GatorMarket Home" className="header__logo">
              <span className="header__logo-text">GatorMarket</span>
            </div>
          </a>
          <div className="header__links">
            <a href="#browse">
              <div className="header__link">
                <span>Browse Listings</span>
              </div>
            </a>
            <a href="#sell">
              <div className="header__link">
                <span>Sell Items</span>
              </div>
            </a>
            <a href="#how-it-works">
              <div className="header__link">
                <span>How It Works</span>
              </div>
            </a>
            <a href="#safety">
              <div className="header__link">
                <span>Safety Tips</span>
              </div>
            </a>
            <a href="#contact">
              <div className="header__link">
                <span>Contact</span>
              </div>
            </a>
          </div>
          <div className="header__actions">
            <button aria-label="Search listings" className="header__icon-btn">
              <svg width="24" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21 21l-4.34-4.34"></path>
                  <circle r="8" cx="11" cy="11"></circle>
                </g>
              </svg>
            </button>
            <button aria-label="View account" className="header__icon-btn">
              <svg width="24" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle r="4" cx="12" cy="7"></circle>
                </g>
              </svg>
            </button>
            <Link to="/login" className="btn-primary btn">Sign In</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

Header.defaultProps = {
  rootClassName: '',
}

Header.propTypes = {
  rootClassName: PropTypes.string,
}

export default Header
