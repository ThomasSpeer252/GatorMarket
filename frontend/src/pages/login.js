import React, { useState } from "react";
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.endsWith("@ufl.edu")) {
        setError("Only UFL email addresses are allowed.");
        return;
        }
        setError("Good Input");
        // history.push("/");
        // API implementation to create account goes here
    };

  return (
    <div className="prelogin-container1">
      <Helmet>
        <title>Login - GatorMarket</title>
        <meta property="og:title" content="Login - GatorMarket" />
      </Helmet>

      <Header></Header>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your UFL email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: "15px" }}>
          Login
        </button>
      </form>

      <Footer></Footer>
    </div>
  );
}

export default Login;