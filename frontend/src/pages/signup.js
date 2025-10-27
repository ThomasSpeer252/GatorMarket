import React, { useState } from "react";
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.endsWith("@ufl.edu")) {
      setError("Only UFL email addresses are allowed.");
      return;
    }
    setError("Good Input");
    // history.push("/");
    // API implementation to create account goes here
  };

  const closeDialog = () => setError("");

  const Dialog = ({ message, onClose }) => {
    if (!message) return null;
    return (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.4)',
          zIndex: 2000,
        }}
        onClick={onClose}
      >
        <div
          role="document"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '90%',
            maxWidth: 420,
            background: '#fff',
            borderRadius: 8,
            padding: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Notice</h3>
          <p style={{ marginBottom: 20 }}>{message}</p>
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={onClose}
              style={{
                padding: '8px 14px',
                borderRadius: 4,
                border: 'none',
                background: '#1976d2',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="prelogin-container1">
      <Helmet>
        <title>Sign Up - GatorMarket</title>
        <meta property="og:title" content="Sign Up - GatorMarket" />
      </Helmet>

      <Header />

      <aside
        className="aqa__action"
        style={{
          marginLeft: '160px',
          marginRight: '160px',
          marginBottom: '12px',
          marginTop: '12px',
          padding: '24px',
        }}
      >
        <div
          className="aqa-action-header"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}
        >
          <h3 className="aqa-action-title" style={{ margin: 0 }}>
            Sign Up
          </h3>
        </div>

        <div className="aqa-widgets">
          <form onSubmit={handleSignUp}>
            <div className="aqa-widget">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your UFL email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary btn aqa-cta">
              Sign Up
            </button>
          </form>
        </div>
      </aside>

      <Footer />

      <Dialog message={error} onClose={closeDialog} />
    </div>
  );
}

export default SignUp