import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import CarouselComponent_2 from '../components/CarouselComponent_2';



const HomePage = () => {
  const carouselItems1 = [
    { image: "https://i.imgur.com/rEf05en.png", link: "/products?category_id=7" },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7uiCsBY8IoloXLyTBrrXjbj0IIF236GDeg&s", link: "/product/32" },
    { image: "https://i.imgur.com/Jt6GB6s.png", link: "/product/28" }
  ];

  const carouselItems2 = [
    { image: "https://i.imgur.com/LeaYlaf.png", link: "/products?category_id=8", style: { width: '400px', height: '300px' } },
    { image: "https://i.imgur.com/khU5XlE.png", link: "/product/39", style: { width: 'auto', height: '300px' } },
    { image: "https://i5.walmartimages.com/asr/64cca0d7-85f4-48f6-96f2-a29e62f79abf.d218531f15301e3cc27c700685cb20bb.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", link: "/product/34", style: { width: '400px', height: '300px' } }
  ];

  const carouselItems3 = [
    { image: "https://via.placeholder.com/800x400", link: "/products?category_id=13" },
    { image: "https://via.placeholder.com/800x400", link: "/products?category_id=14" },
    { image: "https://via.placeholder.com/800x400", link: "/products?category_id=15" }
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
// Finish up on carisal for home page
// MEDIA QUERIES!-> change to use bulma for pages for media queris
// Deployment
// README.md

// After Graduation-->
// Tweak flow (smoothness) between pages, (Auth flow,'please sign in', 'Must Be Signed in to view ______')
