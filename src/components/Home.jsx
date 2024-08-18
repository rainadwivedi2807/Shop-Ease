import React from 'react'
import Products from './Products'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { carouselItems } from '../utils/CarouselData';


const Home = () => {
    console.log(carouselItems)
  return (
    <div className='hero'>

        <Carousel showThumbs={false} autoPlay={true} interval={3000} infiniteLoop>
            {carouselItems.map((item) => (
                <div key={item.id} className="carousel-slide">
                    <img src={item.src} alt={item.alt} className="carousel-image" />
                    <div className="carousel-content">
                    <p className="carousel-title" style={item.style || {}}>
                        {item.title}
                    </p>
                    </div>
                </div>
            ))}
        </Carousel>
        
        <Products/> 
    </div>

  )
}

export default Home;
