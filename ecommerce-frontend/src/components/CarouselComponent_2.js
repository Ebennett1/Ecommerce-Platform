import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bulma-carousel/dist/css/bulma-carousel.min.css';
import bulmaCarousel from 'bulma-carousel';

const CarouselComponent_2 = ({ items }) => {
  useEffect(() => {
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: 1,
      autoplay: true,
    });
  }, []);

  return (
    <div className='carousel-container_2'>
      <div className="carousel">
        {items.map((item, index) => (
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
