import React from "react";
import 'flowbite';
import '../pages/styles/footer.css'

function Footer(){
return(
    <div className="footer">

<footer className="relative bg-light-200 pt-8 pb-6">
<div className="container mx-auto px-4">
    <div className=" text-left lg:text-left ">
      <div className=" w-full lg:w-6/12 px-4 ms-5">
        <h4 className="text-3xl fonat-semibold">Let's keep in touch!</h4>
        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>
        <div className="mt-6 lg:mb-0 ms-2 mb-6 grid lg:grid-cols-12 md:grid-cols-2 sm:grid-cols-3 gap-4">
          <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-twitter"></i></button>
            <button className="bg-white  text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none  mr-2" type="button">
            <i className="fab fa-facebook-square"></i></button>
            <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-dribbble"></i></button>
            <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </div>
      <div className=" w-full lg:w-6/12 px-4 mt-5 ms-5">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
        <div className="w-full lg:w-4/12  px-4 ml-auto mt-4  ">
            <span className="block uppercase text-stone-500 text-sm font-semibold mb-2">Useful Links</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>
                 Signup</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Login</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Home</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Categories</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Products</a>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-4/12 px-4 mt-4 ">
            <span className="block uppercase text-stone-500 text-sm font-semibold mb-2">Other Links</span>
            <ul className="list-unstyled">
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Privacy Policy</a>
              </li>
              <li>
                <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#"><i className="fas fa-arrow-right" style={{fontSize:"10px"}}>&nbsp;&nbsp;</i>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      </div>
      <hr className="my-6 border-blueGray-300"/>
    <div className="flex items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div id= "copy"className="text-sm font-semibold py-1">
          Copyright © <span id="get-current-year">2023</span>
          {/* <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank"> Notus JS by</a>
          <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">Creative Tim</a>. */}
        </div>
      </div>
    </div>
      </div>
</footer>

    </div>
);
}
export default Footer;