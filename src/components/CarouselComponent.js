import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CarouselComponent = () => {
  useEffect(() => {
    // Dynamically require bulma-carousel to avoid issues with SSR or during build
    const bulmaCarousel = require('bulma-carousel');
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,  // Number of slides to scroll per transition
      slidesToShow: 1,    // Number of slides to show at a time
      autoplay: true,     // Enable automatic sliding
    });
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <div className='carousel-container'>
      <div className="carousel">
        {/* First slide without a link */}
        <div className="item-1">
          <img src="https://i.imgur.com/cr2njw4.png" alt="First slide" />
        </div>
        
        {/* Second slide with a link to the products page */}
        <div className="item-2">
          <Link to="/products">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeX1O3zIfDbeH4iF_5gUfJq6YucXkl6xTzqA&s" alt="Second slide" />
          </Link>
        </div>
        
        {/* Third slide with a link to the order history page */}
        <div className="item-3">
          <Link to="/order-history">
            <img src="https://assets.isu.pub/document-structure/230815123231-562fa5067dc98c9ff9d188888caa5bb0/v1/116c8bed7ce992021d89f2af7e7fa526.jpeg" alt="Third slide" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
