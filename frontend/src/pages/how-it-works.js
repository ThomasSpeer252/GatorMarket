import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const HowItWorks = () => { // Static display page for how GatorMarket works
    return (
        <div className="prelogin-container1">
            <Helmet>
                <title>How It Works - GatorMarket</title>
            </Helmet>

            <Header />

            <section id="account-section" className="aqa">
                <div className="aqa-grid">

                    <div className="aqa__card">
                        <h2 id="aqa-title" className="aqa-title">How It Works</h2>

                        <p className="aqa-description">
                            GatorMarket is designed specifically for University of Florida students. Users can post items,
                            goods, and services across multiple categories.
                        </p>

                        <h3>Getting Started</h3>
                        <p className="aqa-description">
                            Sign in or create an account using your GatorLink <strong>@ufl.edu</strong> email.
                        </p>

                        <h3>How to Complete a Transaction</h3>
                        <ol className="aqa-description">
                            <li>Browse listings on the “Listings” page. Items can be filtered by category, name, and price.</li>
                            <li>Click on an item or service you’re interested in.</li>
                            <li>Review the product and seller information. If you want to proceed, select the transaction option.</li>
                            <li>All GatorMarket transactions must be completed on campus at verified GatorMarket locations.</li>
                            <li>Contact the seller and meet at the chosen verified location to complete the exchange.</li>
                        </ol>

                        <h3>How to Post a Listing</h3>
                        <ol className="aqa-description">
                            <li>Select the “Sell Items” option in the website header.</li>
                            <li>Authenticate using your username and password.</li>
                            <li>Enter listing details such as title, description, price, category, and image (optional).</li>
                            <li>Click the “Add Listing” button.</li>
                            <li>Interested buyers will contact you using your account’s contact information.</li>
                            <li>Meet buyers only at verified GatorMarket transaction locations and ensure products are as described.</li>
                        </ol>

                        <h3>Important</h3>
                        <p className="aqa-description">
                            All items must be sold <strong>AS IS</strong>.  
                            If you experience issues with a buyer or seller at any point, contact the GatorMarket administrators.
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HowItWorks
