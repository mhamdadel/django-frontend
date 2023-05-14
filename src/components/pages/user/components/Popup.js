import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

import 'animate.css';
import '../styles/popup.css';

function Pop() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPopup(true), 5000);
}, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
<div className={`popup ${showPopup ? 'show' : ''}`}>
      <div className="popcontainer animate__animated animate__fadeInLeft">
        <button id="close" onClick={handleClosePopup}>x</button>

        <h1>
          Hi &nbsp; 
          <i className="far fa-grin-hearts" style={{color:'#9ea18e'}}></i> <br /> If You Enjoyed Watching Our Website 
        </h1>
        <h4 className="pb-4">
          Make an account to start your journey  and make your first order &nbsp; 
          <i className="far fa-grin-wink" style={{color:'#9ea18e'}}></i>
        </h4>
        <Link to={'login'} type="button" id="button" onClick={handleClosePopup} className="text-white focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg px-5  mr-2 mb-2  ">Login</Link>
      </div>
    </div>
  );
}

export default Pop;