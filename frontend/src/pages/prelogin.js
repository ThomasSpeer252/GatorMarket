import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const PreLogin = (props) => {
  return (
    <div className="prelogin-container1">
      <Helmet>
        <title>PreLogin - GatorMarket</title>
        <meta property="og:title" content="PreLogin - GatorMarket" />
      </Helmet>
      <Header></Header>
      <section id="account-section" className="aqa">
        <div className="aqa-grid">
          <div className="aqa__card">
            <h2 id="aqa-title" className="aqa-title">
              Account Quick Access
            </h2>
            <p className="aqa-description">
              {' '}
              Secure sign-in for UF students — authenticate with your @ufl.edu
              email to access buying, selling, messaging, and reviews.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </p>
            <nav aria-label="Account actions" className="aqa-nav">
              <a href="login">
                <div className="aqa-link aqa-link-primary">
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle r="4" cx="12" cy="7"></circle>
                    </g>
                  </svg>
                  <div className="aqa-link-content">
                    <span className="aqa-link-title">
                      Already have an account?
                    </span>
                    <span className="aqa-link-subtitle">
                      {' '}
                      Log in to manage listings and messages
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </a>
              <a href="signup">
                <div className="aqa-link">
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
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                        width="18"
                        height="11"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </g>
                  </svg>
                  <div className="aqa-link-content">
                    <span className="aqa-link-title">New to GatorMarket?</span>
                    <span className="aqa-link-subtitle">
                      {' '}
                      Register with your UF credentials
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </a>
              <a href="#">
                <div className="aqa-link">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="aqa-link-content">
                    <span className="aqa-link-title">Need help?</span>
                    <span className="aqa-link-subtitle">
                      Visit Account Settings
                    </span>
                  </div>
                </div>
              </a>
            </nav>
          </div>
          <aside className="aqa__action">
            <div className="aqa-action-header">
              <h3 className="aqa-action-title">Ready to sell?</h3>
              <p className="aqa-action-description">
                {' '}
                Post a listing in minutes — upload photos, set pricing, and
                reach fellow students.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
            <button type="button" className="btn-primary btn aqa-cta">
              {' '}
              Post a Listing
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </button>
            <div className="aqa-widgets">
              <div className="aqa-widget">
                <div className="aqa-widget-icon">
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
                <div className="aqa-widget-content">
                  <span className="aqa-widget-label">Verification Status</span>
                  <span className="aqa-widget-value">UF Student Verified</span>
                </div>
              </div>
              <div className="aqa-widget">
                <div className="aqa-widget-icon">
                  <svg
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="aqa-widget-content">
                  <span className="aqa-widget-label">Messages</span>
                  <span className="aqa-widget-value">Check</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default PreLogin
