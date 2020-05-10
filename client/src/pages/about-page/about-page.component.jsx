import React from "react";

import "./about-page.style.scss";
import { ReactComponent as AboutUsVector } from "../../assets/graphics/undraw_online_connection_6778.svg";

const AboutPage = () => 
(
<div className="about-page">
    {/* <div className="about-page-container"> */}
    <div className="about-page-container">
        <div className="purpose-container">
            <AboutUsVector className="about-picture"/>

            <div className="about-content">
                <div className="about-header">
                about us
                </div>
                <div className="about-goal">
                    Broadkats.me is a web application that links multiple users to a server hosted browser for real-time group streaming of videos and browser-hosted content.  
                With the rapid proliferation of technologies for interconnecting users across the world online, the technology community has already begun to pioneer websites and applications engineered to provide a mutually-shared online hub. Applications such as Team-Viewer and Discord allow users to share or access another’s screen without requiring a physical presence, an especially useful functionality for long-distance relationships of any kind. However, despite the existing community for this particular feature, not many have implemented these services in such an all-accessible user-friendly manner. The goal of broadkats.me is to build an easy to use web application for the streaming community to stream together.
                </div>
            </div>
        </div>
    </div>
    {/* </div> */}
</div>
);

export default AboutPage;
