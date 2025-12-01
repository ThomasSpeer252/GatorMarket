import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "./prelogin.css"

const UpdateAccount = () => {
  const [authUsername, setAuthUsername] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [accountData, setAccountData] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSeller, setIsSeller] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAuthenticate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`http://localhost:8000/gatormarket/accounts/?username=${authUsername}`, {
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
      const account = accounts.find((acc) => acc.username === authUsername)
      if (!account) {
        setError("Account not found.")
        setLoading(false)
        return
      }
      if (account.password !== authPassword) {
        setError("Incorrect password.")
        setLoading(false)
        return
      }
      setAccountData(account)
      setUsername(account.username)
      setEmail(account.email)
      setPhoneNumber(account.phone_number)
      setIsSeller(account.isseller || false)
      setIsAuthenticated(true)
      setError("")
    } catch (err) {
      console.error("Authentication error:", err)
      setError(`Error: ${err.message || "Authentication failed"}`)
    } finally {
      setLoading(false)
    }
  }
  const handleUpdateAccount = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    if (!email.endsWith("@ufl.edu")) {
      setError("Only UFL email addresses are allowed.")
      setLoading(false)
      return
    }
    try {
      const updateData = {
        username: username,
        email: email,
        phone_number: phoneNumber,
        rating: accountData.rating,
        isseller: isSeller,
        isadmin: accountData.isadmin,
      }
      if (newPassword.trim() !== "") {
        updateData.password = newPassword
      } else {
        updateData.password = accountData.password
      }
      const response = await fetch(`http://localhost:8000/gatormarket/accounts/${accountData.account_number}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
      const result = await response.json()
      if (response.ok) {
        setSuccess("Account updated successfully!")
        setAccountData(result)
        setNewPassword("") 
        const storedAccount = localStorage.getItem("account")
        if (storedAccount) {
          const parsed = JSON.parse(storedAccount)
          if (parsed.account_number === result.account_number) {
            localStorage.setItem("account", JSON.stringify(result))
          }
        }
      } else {
        let errorMessage = "Failed to update account."
        if (result.error) {
          errorMessage = typeof result.error === "string" ? result.error : JSON.stringify(result.error)
        } else if (result.message) {
          errorMessage = result.message
        }
        setError(errorMessage)
      }
    } catch (err) {
      console.error("Update error:", err)
      setError(`Error: ${err.message || "Unknown error occurred"}`)
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
                Update Account Information
              </h3>
            </div>
            <p style={{ marginBottom: "20px", color: "#6b7280" }}>
              Please authenticate with your username and password to update your account.
            </p>
            <div className="aqa-widgets">
              <form onSubmit={handleAuthenticate}>
                <div className="aqa-widget">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={authUsername}
                    placeholder="Enter your username"
                    onChange={(e) => setAuthUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={authPassword}
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
                Update Your Information
              </h3>
            </div>
            <p style={{ marginBottom: "20px", color: "#6b7280" }}>
              Update your account details below. Leave password blank to keep it unchanged.
            </p>
            <div className="aqa-widgets">
              <form onSubmit={handleUpdateAccount}>
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
                  <label>Phone Number:</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    placeholder="Enter your phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <label>New Password (optional):</label>
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="Leave blank to keep current password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="aqa-widget" style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isSeller}
                      onChange={(e) => setIsSeller(e.target.checked)}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                    <span>Enable selling on my account</span>
                  </label>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", marginLeft: "26px" }}>
                    Check this box to enable selling capabilities on your account
                  </p>
                </div>
                <button type="submit" className="btn-primary btn aqa-cta" disabled={loading}>
                  {loading ? "Updating..." : "Update Account"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  className="btn aqa-cta"
                  style={{ background: "#6b7280", color: "#fff", marginTop: "8px" }}
                >
                  Cancel
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
export default UpdateAccount