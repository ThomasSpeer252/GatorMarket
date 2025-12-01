import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "./prelogin.css"

const AddListing = () => {

  const [username, setAuthUsername] = useState("")
  const [password, setAuthPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:8000/gatormarket/accounts/?username=${username}`, {
        method: "GET",
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
      if (account.password !== password) {
        setError("Incorrect password.")
        setLoading(false)
        return
      }

      if (!account.isseller) {
        setError("Access denied. Admin privileges required.")
        setLoading(false)
        return
      }
      setAuthenticatedUser(account)
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Failed to authenticate")
    } finally {
      setLoading(false)
    }
  }

  const handleAddListing = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const listingData = {
        title: title,
        description: description,
        price: Number.parseInt(price),
        image_location: "",
        category: category,
        original_poster: authenticatedUser.username,
      }

      const response = await fetch(`http://localhost:8000/gatormarket/listings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      })

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        setError("Backend server is not available. Please ensure the API server is running on localhost:8000")
        setLoading(false)
        return
      }

      const result = await response.json()

      if (response.ok) {
        setSuccess(`Listing "${title}" added successfully!`)
        setTitle("")
        setDescription("")
        setPrice("")
        setCategory("")
      } else {
        setError(result.error || "Failed to add listing.")
      }
    } catch (err) {
      setError("Backend server is not available. Please ensure the API server is running on localhost:8000")
    } finally {
      setLoading(false)
    }
  }

  const closeDialog = () => {
    setError("")
    setSuccess("")
  }

  const Dialog = ({ message, onClose, type = "error" }) => {
    if (!message) return null
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
          <h3 style={{ marginTop: 0, color: type === "success" ? "#059669" : "#dc2626" }}>
            {type === "success" ? "Success" : "Notice"}
          </h3>
          <p style={{ marginBottom: 20 }}>{message}</p>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 14px",
                borderRadius: 4,
                border: "none",
                background: type === "success" ? "#059669" : "#1976d2",
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
        {!isAuthenticated ? (
          <>
            <div
              className="aqa-action-header"
              style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}
            >
              <h3 className="aqa-action-title" style={{ margin: 0 }}>
                Add New Listing
              </h3>
            </div>

            <div className="aqa-widgets">
              <form onSubmit={handleLogin}>
                <div className="aqa-widget">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => setAuthUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary btn aqa-cta" disabled={loading}>
                  {loading ? "Authenticating..." : "Authenticate"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div
              className="aqa-action-header"
              style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}
            >
              <h3 className="aqa-action-title" style={{ margin: 0 }}>
                Create New Listing
              </h3>
            </div>
            <p style={{ marginBottom: "20px", color: "#6b7280" }}>
              Logged in as: <strong>{authenticatedUser.username}</strong>
            </p>

            <div className="aqa-widgets">
              <form onSubmit={handleAddListing}>
                <div className="aqa-widget">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter listing title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="aqa-widget" style={{ marginTop: "10px" }}>
                  <label>Description:</label>
                  <textarea
                    value={description}
                    placeholder="Enter listing description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #d1d5db",
                      fontFamily: "inherit",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div className="aqa-widget" style={{ marginTop: "10px" }}>
                  <label>Price ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <label>Category:</label>
                  <input
                    type="text"
                    value={category}
                    placeholder="Enter category (e.g., Electronics, Books, Clothing)"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary btn aqa-cta" disabled={loading}>
                  {loading ? "Adding Listing..." : "Add Listing"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticated(false)
                    setTitle("")
                    setDescription("")
                    setPrice("")
                    setCategory("")
                  }}
                  className="btn aqa-cta"
                  style={{ background: "#6b7280", color: "#fff", marginTop: "8px" }}
                >
                  Logout
                </button>
              </form>
            </div>
          </>
        )}
      </aside>

      <Footer />

      <Dialog message={error} onClose={closeDialog} type="error" />
      <Dialog message={success} onClose={closeDialog} type="success" />
    </div>
  )
}

export default AddListing
