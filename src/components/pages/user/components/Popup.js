import React, { useState, useEffect } from "react";
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
        <button type="button" id="button" onClick={handleClosePopup} className="text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
      </div>
    </div>
  );
}

export default Pop;