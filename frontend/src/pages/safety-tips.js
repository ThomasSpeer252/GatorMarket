import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import './prelogin.css'

const SafetyTips = () => {
    return (
        <div className="prelogin-container1">
            <Helmet>
                <title>Safety Tips - GatorMarket</title>
            </Helmet>

            <Header />

            <section id="account-section" className="aqa">
                <div className="aqa-grid">

                    <div className="aqa__card">
                        <h2 id="aqa-title" className="aqa-title">Safety Tips</h2>

                        <p className="aqa-description">
                            GatorMarket relies entirely on <strong>in-person interaction</strong>, so safety must be a top priority 
                            for both buyers and sellers. Below are essential safety guidelines to ensure your transactions remain safe.
                        </p>

                        <h3>Important Safety Guidelines</h3>
                        <ol className="aqa-description">
                            <li>
                                <strong>Meet only at official GatorMarket verified locations.</strong><br />
                                These locations are always on the University of Florida campus and are monitored by UF Police and 
                                GatorMarket personnel.  
                                We strongly advise against meeting anywhere else.  
                                GatorMarket is not responsible for incidents that occur due to meeting at unverified locations.
                            </li>

                            <li>
                                <strong>Confirm that the other user’s contact info is an official GatorLink email.</strong><br />
                                While GatorMarket validates UF emails during account creation, there is always a small possibility 
                                of unofficial accounts slipping through.
                            </li>

                            <li>
                                <strong>Use verification steps before meeting.</strong><br />
                                Exchange photos of:
                                <ul>
                                    <li>The item or service being sold</li>
                                    <li>The location</li>
                                    <li>Your UF student ID (if you feel comfortable)</li>
                                </ul>
                                This helps ensure legitimacy and prevents scams.
                            </li>

                            <li>
                                <strong>If anything feels suspicious, stop immediately.</strong><br />
                                Contact GatorMarket administrators and wait for further instructions before proceeding.
                            </li>
                        </ol>

                        <p className="aqa-description">
                            Safety first.
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default SafetyTips