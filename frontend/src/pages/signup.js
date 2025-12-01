import React, { useState } from "react";
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.endsWith("@ufl.edu")) {
      setError("Only UFL email addresses are allowed.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/gatormarket/accounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          phone_number: phoneNumber,
          rating: 0,
          isseller: false,
          isadmin: false,
        }),
      });

      const result = await response.json();
      console.log("Sign up response:", result, "Status:", response.status);

      if (response.ok) {
        setError("");
        localStorage.setItem("account", JSON.stringify(result));
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/listings";
      } else {
        const errorMessage = result.error || JSON.stringify(result) || "Failed to create account.";
        setError(errorMessage);
        console.error("Sign up error response:", errorMessage);
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
              <label>Username:</label>
              <input
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="aqa-widget" style={{ marginTop: "10px" }}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your UFL email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="aqa-widget" style={{ marginTop: "10px" }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                placeholder="Enter your phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary btn aqa-cta" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
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