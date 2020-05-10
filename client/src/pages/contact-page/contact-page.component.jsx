import React from "react";

import "./contact-page.style.scss";

//components
import Developer from "../../components/developer/developer.component";
import ContactUs from "../../components/contact-us/contact-us.component";

import { ReactComponent as ContactUsVector } from "../../assets/graphics/undraw_contact_us_15o2.svg";

const ContactPage = () => (
  <div className="contact-page">
    <div className="contact-picture-container">
      <ContactUsVector className="contact-us-picture"/>
      <ContactUs 
          className="message-form"
          />
    </div>
    <div className="contact-container">

      <Developer 
        className="developer-sam"
        imageSrc={"https://cdn.shopify.com/s/files/1/0074/3315/8771/products/product-image-901659573_1200x1200.jpg?v=1575443659"}
        name={"Sam Alhaqab"}
        location={"la county, ca"}
        content={"broadkatsme developer"}
        github={"https://github.com/at235am"}
        linkedin={"https://www.linkedin.com/"}
          />
      <Developer 
        className="developer-julie"
        imageSrc={"https://wallpaperaccess.com/full/82956.jpg"}
        name={"Julie Do"}
        location={"orange county, ca"}
        content={"broadkatsme developer"}
        github={"https://github.com/jelliciousdodobird"}
        linkedin={"https://www.linkedin.com/"}
          />
      <Developer 
        className="developer-izzy"
        imageSrc={"https://ae01.alicdn.com/kf/HTB1FA7NaifrK1RjSspbq6A4pFXau/Cool-Stylish-and-Funny-Cute-Pet-Sunglasses-Classic-Retro-Circular-Metal-Prince-Sunglasses-for-Cat-Chihuahua.jpg"}
        name={"Isabella Dinh"}
        location={"orange county, ca"}
        content={"broadkatsme developer"}
        github={"https://github.com/izzykid"}
        linkedin={"https://www.linkedin.com/in/isabelladinh/"}
          />

      {/* <Developer 
        className="developer-ricky"
        imageSrc={"https://cdn.shopify.com/s/files/1/0074/3315/8771/products/product-image-901659573_1200x1200.jpg?v=1575443659"}
        name={"mr.potatoex"}
        location={"la county, ca"}
        content={"dogs r the bane of my existence"}
        /> */}


    </div>
  </div>
);

export default ContactPage;
