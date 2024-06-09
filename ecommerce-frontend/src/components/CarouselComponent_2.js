import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import bulmaCarousel from 'bulma-carousel';

// Carousel component using bulma-carousel
const CarouselComponent_2 = ({ items }) => {
  useEffect(() => {
    // Initialize bulma-carousel with specified options
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,  // Number of slides to scroll per transition
      slidesToShow: 1,    // Number of slides to show at a time
      autoplay: true,     // Enable automatic sliding
    });
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <div className='carousel-container_2'>
      <div className="carousel">
        {items.map((item, index) => (
          // Each item in the carousel is wrapped in a Link component
          <div className={`item-${index + 1}`} key={index}>
            <Link to={item.link}>
              <img src={item.image} alt={`Slide ${index + 1}`} style={item.style} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent_2;
