//react and routing
import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../../utils";
//SVGs and Icons
import { ReactComponent as PetAdoption } from "../../../assets/graphics/undraw_pet_adoption_2qkw.svg";
import SplashPhoto from "../../../assets/graphics/splash_photo3.png";
//components
import Carousel from "../../../components/carousel/carousel.component";

//styles
import "./home.style.scss";


const Home = ({userAuth, subscribedRooms,}) => {

  return (
    <div className="home-container">
        {/* <PetAdoption className="pet-adoption"/> */}
        <img className="splash-photo" src={SplashPhoto} />
        <Carousel 
            className="carousel-random"
            random />
        <Carousel 
            className="carousel-random"
            random />
        <Carousel 
            className="carousel-random"
            random />
    </div>
  );
};

const mapStateToProps = (state) => ({
    // currentUser: state.user.currentUser,
    userAuth: state.user.userAuth,
    subscribedRooms: state.room.subscribedRooms,
  });

export default connect(mapStateToProps)(Home);

