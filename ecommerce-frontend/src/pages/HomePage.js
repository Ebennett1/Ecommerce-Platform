import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';
import CarouselComponent_2 from '../components/CarouselComponent_2';



const HomePage = () => {
  return (
   <div className="carousel-wrapper">
      <CarouselComponent />
      <CarouselComponent_2 />
      <CarouselComponent_2 />
      <CarouselComponent_2 />
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
