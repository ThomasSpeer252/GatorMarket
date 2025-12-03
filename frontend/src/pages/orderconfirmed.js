import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";

const OrderConfirmed = () => {
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);

    const item = params.get("item"); // gather persistent data
    const seller = params.get("seller");
    const email = params.get("email");
    const phone = params.get("phone");
    const pickup = params.get("pickup");

    return (
        <div>
            <Header />

            <main style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
                <h1>Order Confirmed ✅</h1>

                <p style={{ fontSize: "18px", marginTop: "15px" }}>
                    Your order has been successfully booked.
                    Please contact the seller to arrange payment and pick-up.
                </p>

                {item && (
                    <p style={{ marginTop: "20px", fontSize: "20px" }}>
                        <strong>Item:</strong> {item}
                    </p>
                )}

                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        background: "#fafafa",
                    }}
                >
                    <h3>Seller Information</h3>

                    {seller && (
                        <p>
                            <strong>Name:</strong> {seller}
                        </p>
                    )}

                    {email && email !== "N/A" && (
                        <p>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${email}`}>{email}</a>
                        </p>
                    )}

                    {phone && phone !== "N/A" && (
                        <p>
                            <strong>Phone:</strong> {phone}
                        </p>
                    )}

                    {pickup && (
                        <>
                            <p>
                                <strong>Pickup Location:</strong> {pickup}
                            </p>

                            <iframe
                                width="100%"
                                height="250"
                                style={{ border: 0, marginTop: "15px", borderRadius: "8px" }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                    pickup
                                )}&output=embed`}
                            ></iframe>
                        </>
                    )}
                </div>

                <button
                    onClick={() => history.push("/listings")}
                    style={{
                        marginTop: "30px",
                        padding: "12px 20px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                >
                    Back to Listings
                </button>
            </main>

            <Footer />
        </div>
    );
};

export default OrderConfirmed;
