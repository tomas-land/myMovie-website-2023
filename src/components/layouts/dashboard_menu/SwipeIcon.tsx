'use client'

import lottie from 'lottie-web';
import { useEffect } from 'react';

const SwipeIcon = () => {
    
  useEffect(() => {
    const container = document.getElementById('lottie-container') as Element;

    // Configure Lottie options
    const options = {
      container,
      path: '/swipe_animation.json', // Path to your animation inside the public folder
      loop: true,
      autoplay: true,
      color:'#000050'
      
    };

    // Create Lottie animation
    const anim = lottie.loadAnimation(options);

    // Clean up animation on component unmount
    return () => {
      anim.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once
  return (
    <div id="lottie-container" style={{ width: '3rem', height: '100%' }}>
  </div>
  )
}

export default SwipeIcon