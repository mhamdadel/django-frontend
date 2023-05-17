import React from "react";
import 'flowbite';
import Slidecarousel from "./user/components/slider";
import TrendingProducts from './user/components/TrendingProducts';
import About from './user/components/About';
import Pop from './user/components/Popup';
import Movingbar from './user/components/MovingBar';
import { useIsAuthenticated } from 'react-auth-kit';
import ShowCategories from "./ecommerce/ShowCategories";

function Home() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="home">
      {isAuthenticated() ? (
        <>
    {/* <Carousel/> */}
    <Slidecarousel/>
    <ShowCategories/>
    <TrendingProducts/>
    <Movingbar/>
    <About/>
    </>
      ):(
        <>
      <Pop/>
      {/* <Carousel/> */}
      <Slidecarousel/>

      <ShowCategories/>
      <TrendingProducts/>
      <Movingbar/>
      <About/> 
      </>
      )}
    </div>
  );
}

export default Home;
