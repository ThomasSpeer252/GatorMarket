import React from 'react'

import './footer.css'

const Footer = (props) => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer-container1">
      <footer id="footer" className="footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="footer-logo-text">GatorMarket</span>
              </div>
              <p className="footer-tagline">
                Your trusted UF student marketplace for buying, selling, and
                trading with confidence.
              </p>
              <div className="footer-trust-badge">
                <svg
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>UF Verified Students Only</span>
              </div>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-column-title">Quick Links</h3>
              <ul className="footer-links-list">
                <li><a href="#"><div className="footer-link"><span>Home</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Browse Listings</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Post a Listing</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>My Account</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Messages</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Favorites</span></div></a></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-column-title">Categories</h3>
              <ul className="footer-links-list">
                <li><a href="#"><div className="footer-link"><span>Textbooks</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Electronics</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Furniture</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Apparel</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Services</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Housing</span></div></a></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-column-title">Support</h3>
              <ul className="footer-links-list">
                <li><a href="#"><div className="footer-link"><span>Help Center</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Safety Tips</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Report Issue</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>FAQs</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Contact Us</span></div></a></li>
                <li><a href="#"><div className="footer-link"><span>Feedback</span></div></a></li>
              </ul>
            </div>

            <div className="footer-contact-column">
              <h3 className="footer-column-title">Get in Touch</h3>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" rx="2" width="20" height="16"></rect>
                      </g>
                    </svg>
                  </div>
                  <a href="mailto:support@gatormarket.ufl.edu?subject=">
                    <div className="footer-contact-link">
                      <span>
                        {' '}
                        support@gatormarket.ufl.edu
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </li>
                <li className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1 2-2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <a href="tel:+13525551234">
                    <div className="footer-contact-link">
                      <span>
                        {' '}
                        (352) 555-1234
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </li>
                <li className="footer-contact-item">
                  <div className="footer-contact-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0zm.894.211v15M9 3.236v15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <span className="footer-contact-text">
                    {' '}
                    University of Florida Campus
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </li>
              </ul>

              <div className="footer-social">
                <h4 className="footer-social-title">Follow Us</h4>
                <div className="footer-social-links">
                  <a href="#">
                    <div aria-label="Facebook" className="footer-social-link">
                      <svg
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  <a href="#">
                    <div aria-label="Twitter" className="footer-social-link">
                      <svg
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  <a href="#">
                    <div aria-label="Instagram" className="footer-social-link">
                      <svg
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                            width="20"
                            height="20"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01"></path>
                        </g>
                      </svg>
                    </div>
                  </a>
                  <a href="#">
                    <div aria-label="LinkedIn" className="footer-social-link">
                      <svg
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z"></path>
                          <circle r="2" cx="4" cy="4"></circle>
                        </g>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © {currentYear} GatorMarket. All rights reserved.
              </p>
              <nav aria-label="Legal navigation" className="footer-legal-nav">
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Privacy Policy</span>
                  </div>
                </a>
                <span className="footer-legal-separator">|</span>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Terms of Service</span>
                  </div>
                </a>
                <span className="footer-legal-separator">|</span>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Cookie Policy</span>
                  </div>
                </a>
                <span className="footer-legal-separator">|</span>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Accessibility</span>
                  </div>
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="footer-bg-decoration"></div>
      </footer>
    </div>
  )
}

export default Footer
