import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import "./Home.css";
import AuthButtons from "./AuthButtons";
import AboutUs from "./Aboutus";

// Import your images
import image1 from "../images/img1.jpg";
import image2 from "../images/img2.jpg";
import image3 from "../images/img3.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container" style={{ marginTop: "70px" }}>
        <div className="dark-overlay"></div>
        <div className="home-text-image-container fade-in-left">
          <div className="home-text-section">
            <h1 className="primary-heading">
              Your Favourite Food Delivered Hot & Fresh
            </h1>
            <p className="primary-text">
              Healthy switcher chefs do all the prep work, like peeling, chopping
              & marinating, so you can cook fresh food.
            </p>
            <button className="secondary-button">
              Order Now <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section fade-in-right">
            <Carousel
              autoPlay
              infiniteLoop
              useKeyboardArrows
              dynamicHeight
              emulateTouch
            >
              <div>
                <img src={image1} alt="Image 1" className="carousel-image" />
              </div>
              <div>
                <img src={image2} alt="Image 2" className="carousel-image" />
              </div>
              <div>
                <img src={image3} alt="Image 3" className="carousel-image" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div>
        <AuthButtons />
      </div>

      <AboutUs />
    </div>
  );
};

export default Home;
