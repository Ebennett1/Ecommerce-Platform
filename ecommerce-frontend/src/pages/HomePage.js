import React, { useEffect, useState } from 'react';
import CarouselComponent from '../components/CarouselComponent';


const HomePage = () => {
  return (
   <div>
      <h1>Welcome To EliteCart!</h1>
      <CarouselComponent />
      </div>
  );
};

export default HomePage;



// Next steps- 
// Work on carisal for home page
// Tweak flow (smoothness) between pages, (Auth flow,'please sign in', 'Must Be Signed in to view ______')
// New CSS framework;--> icons if possible for cart, profile, etc