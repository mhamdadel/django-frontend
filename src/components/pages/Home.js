import React from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import Carousel from "./user/components/Carousel";
import TrendingProducts from './user/components/TrendingProducts';
import About from './user/components/About';
import ShowCategories from "./ecommerce/ShowCategories";
function Home() {
  return (
    <div className="home">
    <Carousel/>
    <ShowCategories/>
    <TrendingProducts/>
    <About/>
    </div>
  );
}

export default Home;
