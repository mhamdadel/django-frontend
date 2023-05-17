import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../styles/slider.css'
const Slidecarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800
  };
  return (
    <div className="slidecarousel" >
    <Slider {...settings}>
      <div id='img1' className="pt-2">
      <h1 className="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Welcome</h1>
      <img   className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />  
      </div>




      <div id="img2" className="pt-2">
      <h1 className="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">IN</h1>
      <img   className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </div>



      <div id="img3" className="pt-2">
       <h1 className="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Our</h1>
       <img   className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </div>

      <div id="img4" className="pt-2">
      <h1 className="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Ecommerce</h1>
      <img  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </div>

      <div id="img5" className="pt-2">
      <h1 className="absolute block top-1/2 left-1/2 font-bold  -translate-x-1/2 -translate-y-1/2 sm:text-3xl ">Website</h1>
     <img   className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      </div>

    
    </Slider>
     </div>
  );
};

export default Slidecarousel;