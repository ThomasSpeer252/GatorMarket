import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Filters
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 16;
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);

    let url = "http://localhost:8000/gatormarket/listings/?";
    if (category) url += `category=${category}&`;
    if (keyword) url += `keyword=${keyword}&`;
    if (minPrice) url += `min_price=${minPrice}&`;
    if (maxPrice) url += `max_price=${maxPrice}&`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      setListings(data);
      setCurrentPage(1); // reset to page 1 after filtering
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const indexOfLast = currentPage * listingsPerPage;
  const indexOfFirst = indexOfLast - listingsPerPage;
  const currentListings = listings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <Header />

      <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h1>Browse Listings</h1>

        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Housing">Housing</option>
            <option value="Textbooks">Textbooks</option>
            <option value="Apparel">Apparel</option>
            <option value="Furniture">Furniture</option>
            <option value="Services">Services</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={fetchListings}>Apply</button>
        </div>
        {loading && <p>Loading listings...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {/* LISTINGS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {currentListings.map((item) => (
            <div
              key={item.listing_number}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <h3>{item.title}</h3>
              {/* IMAGE */}
              {item.image_location ? (
                <img
                  src={`http://localhost:8000${item.image_location}`}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    background: "#eee",
                    borderRadius: "6px",
                  }}
                ></div>
              )}
              <p>{item.description}</p>

              <p>
                <strong>Price:</strong> ${item.price}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
            </div>
          ))}
        </div>
        {/* No results */}
        {!loading && currentListings.length === 0 && (
          <p>No listings found.</p>
        )}
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 14px",
                border: "2px solid black",
                borderRadius: "6px",
                fontWeight: "bold",
                background: currentPage === 1 ? "#ddd" : "white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  style={{
                    padding: "8px 14px",
                    border: "2px solid black",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    background: num === currentPage ? "#000" : "white",
                    color: num === currentPage ? "white" : "black",
                    cursor: "pointer",
                  }}
                >
                  {num}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 14px",
                border: "2px solid black",
                borderRadius: "6px",
                fontWeight: "bold",
                background: currentPage === totalPages ? "#ddd" : "white",
                cursor:
                  currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
export default Listings;
