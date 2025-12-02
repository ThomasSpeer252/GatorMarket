import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const Contact = () => {
    return (
        <div className="prelogin-container1">
            <Helmet>
                <title>Contact - GatorMarket</title>
            </Helmet>

            <Header />

            <section id="account-section" className="aqa">
                <div className="aqa-grid">

                    <div className="aqa__card">
                        <h2 id="aqa-title" className="aqa-title">Contact</h2>

                        <p className="aqa-description">
                            You can use the following points of contact for any queries, questions, or concerns:
                        </p>

                        <ul className="aqa-description">
                            <li>
                                <strong>Email:</strong> support@gatormarket.ufl.edu
                            </li>
                            <li>
                                <strong>Phone:</strong> 352-555-1234
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Contact
