import React from 'react'
import Products from './Products'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Home = () => {
  return (
    <div className='hero'>

        <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop>
            <div className="carousel-slide">
                <img src="./assets/images/bg.avif" className="carousel-image" alt="Background"  />
                <div className="carousel-content">
                    <p className="carousel-title">Fashion Frenzy: Unveil the Latest Trends</p>
                </div>
            </div>

            <div className="carousel-slide">
                <div className="carousel-content">
                    <p className="carousel-title" style={{marginLeft:`50rem`}}>Elevate Your Wardrobe</p>
                </div>
                <img src="./assets/images/bg-2.jpeg" className="carousel-image" alt="Background"  />
            </div>

            <div className="carousel-slide">
                <img src="./assets/images/bg-3.jpeg" className="carousel-image" alt="Background"  />
                <div className="carousel-content">
                    <p className="carousel-title" style={{marginLeft:`50rem`}}>Dress to Impress: Own Your Style</p>
                </div>
            </div>
            
        </Carousel>         
        
        <Products/> 
    </div>

  )
}

export default Home;
