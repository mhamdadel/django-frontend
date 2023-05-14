import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../styles/movingbar.css'
const Movingbar = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 9000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return (
    <div className="slider">
    <Slider {...settings}>
      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px'}} />
      </div>
      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaCUyMHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  style={{width:'100px'}} />
      </div>
      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2glMjBwcm9kdWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1513555633610-d912838b8ac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2glMjBwcm9kdWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1525459819821-1c2d33189e23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2glMjBwcm9kdWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1555487505-8603a1a69755?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1591785944213-c8b5b7a75ec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>


      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1565536421951-135eb52b6e5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>


      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1565536421961-1f165e0c981e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHx0ZWNobm9sb2d5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjZ8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1609900179119-3ed9f4530eb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMyfHx0ZWNobm9sb2d5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHRlY2hub2xvZ3klMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjcxfHx0ZWNobm9sb2d5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>

      <div className="pt-2">
      <img id="img01" src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIzfHx0ZWNobm9sb2d5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"  style={{width:'100px',height:'70px'}} />
      </div>
    </Slider>
    </div>
  );
};

export default Movingbar;