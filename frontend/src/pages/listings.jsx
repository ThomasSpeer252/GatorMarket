import React, { useEffect, useState } from 'react';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Backend fetch failed:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        GatorMarket Listings
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem"
      }}>
        {listings.map((item) => (
          <div key={item.id} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
            {item.image_url && (
              <img
                src={`http://localhost:8000/${item.image_location.replace(/^\/?/, '')}`}
                alt={item.title}
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}

            <h2 style={{ fontSize: "1.3rem", marginTop: "0.5rem" }}>{item.title}</h2>
            <p>{item.description}</p>
            <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
