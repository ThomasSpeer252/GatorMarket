import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "./prelogin.css"

const AdminListings = () => {

  // states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //Listings state
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  
  // API state
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:8000/gatormarket/accounts/?username=${username}`, {
        method: "GET", // Get as a fetch account details
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        setError("Account not found.")
        setLoading(false)
        return
      }
      const accounts = await response.json()
      const account = accounts.find((acc) => acc.username === username)
      if (!account) {
        setError("Account not found.")
        setLoading(false)
        return
      }
      if (account.password !== password) { // Simple password check
        setError("Incorrect password.")
        setLoading(false)
        return
      }

      if (!account.isadmin) { // Enforce admin 
        setError("Access denied. Admin privileges required.")
        setLoading(false)
        return
      }

      setIsAuthenticated(true) // set authentication state
      await fetchListings()
    } catch (err) {
      setError(err.message || "Failed to authenticate") // Properly display error in popup
    } finally {
      setLoading(false)
    }
  }

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8000/gatormarket/listings/")
      // Implied GET method
      if (!response.ok) {
        throw new Error("Failed to fetch listings")
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend server returned invalid response")
      }

      const data = await response.json()
      setListings(data) // Set fetched listings into table
    } catch (err) {
      setError(err.message || "Failed to load listings")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`http://localhost:8000/gatormarket/listings/${listingId}/`, {
        method: "DELETE", // Delete method with ID linking to bad listing, headless 
      })

      if (!response.ok) { // Failure checking and reporting
        throw new Error("Failed to delete listing")
      }
      setSuccess("Listing deleted successfully")
      await fetchListings() // Refresh to reflect deletion
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err.message || "Failed to delete listing")
    } finally {
      setLoading(false)
    }
  }

  const closeDialog = () => {
    setError("")
    setSuccess("")
  }
  // Dialog component for error/success messages
  const Dialog = ({ message, type = "error", onClose }) => {
    if (!message) return null
    const isError = type === "error"
    return (
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.4)",
          zIndex: 2000,
        }}
        onClick={onClose}
      >
        <div
          role="document"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "90%",
            maxWidth: 420,
            background: "#fff",
            borderRadius: 8,
            padding: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h3 style={{ marginTop: 0, color: isError ? "#dc2626" : "#16a34a" }}>{isError ? "Error" : "Success"}</h3>
          <p style={{ marginBottom: 20 }}>{message}</p>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 14px",
                borderRadius: 4,
                border: "none",
                background: isError ? "#dc2626" : "#16a34a",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="prelogin-container1">
        <Header />

        <aside
          className="aqa__action"
          style={{
            marginLeft: "160px",
            marginRight: "160px",
            marginBottom: "12px",
            marginTop: "12px",
            padding: "24px",
          }}
        >
          <div
            className="aqa-action-header"
            style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}
          >
            <h3 className="aqa-action-title" style={{ margin: 0 }}>
              Admin Login
            </h3>
          </div>

          <div className="aqa-widgets">
            <form onSubmit={handleLogin}>
              <div className="aqa-widget">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  placeholder="Enter admin username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="aqa-widget" style={{ marginTop: "10px" }}>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter admin password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary btn aqa-cta" disabled={loading}>
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </div>
        </aside>

        <Footer />

        <Dialog message={error} type="error" onClose={closeDialog} />
      </div>
    )
  }

  return (
    <div className="prelogin-container1">
      <Header />

      <aside
        className="aqa__action"
        style={{
          marginLeft: "160px",
          marginRight: "160px",
          marginBottom: "12px",
          marginTop: "12px",
          padding: "24px",
        }}
      >
        <div
          className="aqa-action-header"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}
        >
          <h3 className="aqa-action-title" style={{ margin: 0 }}>
            Manage Listings
          </h3>
          <button
            onClick={() => setIsAuthenticated(false)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Logout
          </button>
        </div>

        {loading && <p style={{ color: "#6b7280" }}>Loading listings...</p>}

        {!loading && listings.length === 0 && <p style={{ color: "#6b7280", marginTop: 20 }}>No listings found.</p>}

        {!loading && listings.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Title</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Price</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Seller</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr key={listing.listing_number} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "12px" }}>{listing.listing_number}</td>
                    <td style={{ padding: "12px" }}>{listing.title}</td>
                    <td style={{ padding: "12px" }}>${listing.price}</td>
                    <td style={{ padding: "12px" }}>{listing.original_poster}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleDeleteListing(listing.listing_number)}
                        disabled={loading}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 4,
                          border: "none",
                          background: "#dc2626",
                          color: "#fff",
                          cursor: loading ? "not-allowed" : "pointer",
                          fontSize: "0.9rem",
                          opacity: loading ? 0.6 : 1,
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </aside>

      <Footer />

      <Dialog message={error} type="error" onClose={closeDialog} />
      <Dialog message={success} type="success" onClose={closeDialog} />
    </div>
  )
}
export default AdminListings