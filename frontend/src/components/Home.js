import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../images/img1.jpg'; // Adjust the path accordingly
import image2 from '../images/img2.jpg'; // Adjust the path accordingly
import image3 from '../images/img3.jpg'; // Adjust the path accordingly
import './Home.css';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    
    <section className="home" id="home">
      <div className="home-text">
        <h1>Welcome to Deepthi Travels!</h1>
        <div className="slider-container">
          <Slider {...settings}>
            <div className="image-container">
              <img src={image1} alt="Image 1" className="square-image" />
            </div>
            <div className="image-container">
              <img src={image2} alt="Image 2" className="square-image" />
            </div>
            <div className="image-container">
              <img src={image3} alt="Image 3" className="square-image" />
            </div>
          </Slider>
        </div>
        <div className="options-container">
          <a href="" className="btn">Login</a>
          <a href="/add" className="btn">Register</a>
        </div>
      </div>
    </section>
  );
}

export default Home;
