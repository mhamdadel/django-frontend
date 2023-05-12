import React from "react";
import Navbar from "../common/navbar";
import Footer from "../common/footer";
import Carousel from "./user/components/Carousel";
function Home() {
  return (
    <div className="home">
    <Navbar/>
    <Carousel/>
    <Footer/>
    </div>
  );
}

export default Home;
