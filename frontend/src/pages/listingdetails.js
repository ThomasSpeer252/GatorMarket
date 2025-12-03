import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { UF_PICKUP_LOCATIONS } from "./pickuplocations";

const ListingDetails = () => {
     // Data States
    const { id } = useParams();
    const history = useHistory();
    const [listing, setListing] = useState(null);
    const [seller, setSeller] = useState(null);
    // API States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Pickup location state initialised to preferred location
    const [pickupLocation, setPickupLocation] = useState(
        "UF Police Safe Exchange Zone (Newins-Ziegler Hall)"
    );

    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                const res = await fetch("http://localhost:8000/gatormarket/listings/?");
                // GET inferred
                if (!res.ok) throw new Error("Failed to fetch listings");

                const data = await res.json();
                const fetchedListing = data.find( // finding requested listing in returned data
                    (item) => String(item.listing_number) === String(id)
                );

                if (!fetchedListing) { // Error handling for invalid listing ID
                    setError("Listing not found.");
                    return;
                }

                setListing(fetchedListing); // Setting listing data on page

                const usersRes = await fetch("http://localhost:8000/gatormarket/accounts/");
                const allUsers = await usersRes.json(); //Grabbing seller info

                const sellerData = allUsers.find( // Find seller's user data
                    (u) => u.username === fetchedListing.original_poster
                );

                if (sellerData) {
                    sellerData.preferred_meeting_location =
                        sellerData.preferred_meeting_location || "Gainesville, FL";
                    setSeller(sellerData); // Seller data
                } else {
                    setSeller({
                        name: fetchedListing.original_poster,
                        email: "N/A",
                        phone_number: "N/A",
                        preferred_meeting_location: "Gainesville, FL",
                    });
                }
            } catch (err) {
                setError(err.message); // error popup
            } finally {
                setLoading(false);
            }
        };

        fetchListingDetails(); // get listing
    }, [id]);

    const handlePurchase = async () => { //purchse handler
        if (!seller) return;

        const confirmPurchase = window.confirm(
            `You are about to purchase "${listing.title}" from ${seller.username || seller.name}.\n\nPickup: ${pickupLocation}\n\nProceed?`
        );

        if (!confirmPurchase) return;

        const payload = {
            lister_username: seller.username || seller.name,
            buyer_username: "demo_buyer",
            listing_number: listing.listing_number
        };

        const redirectURL = `/order-confirmed?item=${encodeURIComponent(
            listing.title
        )}&seller=${encodeURIComponent( // saving persistant data
            seller.username || seller.name
        )}&email=${encodeURIComponent(
            seller.email || ""
        )}&phone=${encodeURIComponent(
            seller.phone_number || ""
        )}&pickup=${encodeURIComponent(pickupLocation)}`;

        try {
            const res = await fetch("http://localhost:8000/gatormarket/transactions/", {
                method: "POST", // post as adding to TX db
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            history.push(redirectURL);
        } catch (err) {
            history.push(redirectURL);
        }
    };

    if (loading) return <p>Loading listing...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <Header />
            <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
                <button
                    onClick={() => history.goBack()}
                    style={{
                        padding: "10px 20px",
                        border: "1px solid black",
                        background: "white",
                        cursor: "pointer",
                        marginBottom: "20px",
                        borderRadius: "6px",
                    }}
                >
                    ⬅ Back
                </button>

                <h1>{listing.title}</h1>

                {listing.image_location ? (
                    <img
                        src={`http://localhost:8000/${listing.image_location.replace(/^\/?/, "")}`}
                        alt={listing.title}
                        style={{
                            width: "100%",
                            maxHeight: "400px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "300px",
                            background: "#eee",
                            borderRadius: "8px",
                            marginBottom: "20px",
                        }}
                    ></div>
                )}

                <p style={{ fontSize: "18px", marginTop: "10px" }}>
                    <strong>Description:</strong> {listing.description}
                </p>

                <p style={{ fontSize: "18px" }}>
                    <strong>Category:</strong> {listing.category}
                </p>

                <p style={{ fontSize: "22px", marginTop: "10px" }}>
                    <strong>Price:</strong> ${listing.price}
                </p>

                {seller && (
                    <div
                        style={{
                            marginTop: "30px",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>Seller Info</h3>

                        <p>
                            <strong>Name:</strong> {seller.username || seller.name}
                        </p>

                        <p>
                            <strong>Email:</strong> {seller.email}
                        </p>

                        <p>
                            <strong>Phone:</strong> {seller.phone_number}
                        </p>

                        <p>
                            <strong>Preferred Location:</strong>{" "}
                            {seller.preferred_meeting_location}
                        </p>
                    </div>
                )}

                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Select Pickup Location</h3>

                    <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            marginBottom: "20px",
                        }}
                    >
                        {UF_PICKUP_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>

                    <iframe
                        width="100%"
                        height="250"
                        style={{ border: 0, borderRadius: "8px" }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            pickupLocation
                        )}&output=embed`}
                    ></iframe>
                </div>

                <button
                    onClick={handlePurchase}
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginTop: "25px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "20px",
                        cursor: "pointer",
                    }}
                >
                    Purchase
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default ListingDetails;
