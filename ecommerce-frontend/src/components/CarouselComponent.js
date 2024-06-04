import React, { useEffect } from 'react';

const CarouselComponent = () => {
  useEffect(() => {
    const bulmaCarousel = require('bulma-carousel');
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
    });
  }, []);

  return (
    <div className="carousel">
      <div className="item-1">
        <img src="https://via.placeholder.com/800x400" alt="First slide" />
      </div>
      <div className="item-2">
        <img src="https://via.placeholder.com/800x400" alt="Second slide" />
      </div>
      <div className="item-3">
        <img src="https://via.placeholder.com/800x400" alt="Third slide" />
      </div>
    </div>
  );
};

export default CarouselComponent;
