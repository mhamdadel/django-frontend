import React from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import Carousel from "./user/components/Carousel";
import TrendingProducts from './user/components/TrendingProducts';
import About from './user/components/About';
import Pop from './user/components/Popup';
import Movingbar from './user/components/MovingBar';

import ShowCategories from "./ecommerce/ShowCategories";
function Home() {
  return (
    <div className="home">
      <Pop/>
    <Carousel/>
    <ShowCategories/>
    <TrendingProducts/>
    <Movingbar/>
    <About/>
    </div>
  );
}

export default Home;
