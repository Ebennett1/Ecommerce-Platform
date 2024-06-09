import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import CarouselComponent_2 from '../components/CarouselComponent_2';



const HomePage = () => {
  const carouselItems1 = [
    { image: "https://i.imgur.com/rEf05en.png", link: "/products?category_id=7" },
    { image: "https://i.imgur.com/IYNDESM.png", link: "/product/32" },
    { image: "https://i.imgur.com/dgQBKoa.png", link: "/product/28" }
  ];

  const carouselItems2 = [
    { image: "https://i.imgur.com/kLmIBnd.png", link: "/products?category_id=8", style: { width: 'auto', height: 'auto' } },
    { image: "https://i.imgur.com/vket4uU.png", link: "/product/39", style: { width: '100%', height: 'auto' } },
    { image: "https://i.imgur.com/Y6GHkCB.png", link: "/product/34", style: { width: 'auto', height: 'auto' } }
  ];

  const carouselItems3 = [
    { image: "https://i.imgur.com/npTsvMv.png", link: "/products?category_id=1" },
    { image: "https://i.imgur.com/ttzeNpr.png", link: "/product/19" },
    { image: "https://i.imgur.com/3tHv4xH.png", link: "/product/21" }
  ];

  return (
    <div className="carousel-wrapper">
      <CarouselComponent />
      <CarouselComponent_2 items={carouselItems1} />
      <CarouselComponent_2 items={carouselItems2} />
      <CarouselComponent_2 items={carouselItems3} />
    </div>
  );
};

export default HomePage;



// Next steps- 
// Deployment
// README.md

// After Graduation-->
// Tweak flow between pages, with (Auth flow,'please sign in', 'Must Be Signed in to view ______')
