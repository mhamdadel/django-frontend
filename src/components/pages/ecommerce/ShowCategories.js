/* eslint-disable react/jsx-no-undef */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BrowserRouter, Link } from 'react-router-dom';
import ShowProduct from './ShowProducts';
import '../user/styles/categoriesHome.css'

const ShowCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/categories/');
      setCategories(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    // <div className="row">
    //   {categories.map((category, index) => (
    //     <div className="col-md-2 mb-2" style={{marginTop: "30px"}} key={index}>
    //       <div className="card h-100">
    //         <img src={`https://res.cloudinary.com/deg0m2eu4/${category.image}`} style={{ height: "500px", width: "100%", objectFit: "cover" }}  className="card-img-top" alt={category.name} />
    //         <div className="card-footer">
    //           <h3>{category.name}</h3>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>


    <div className="categoryHome mt-8 h-56 sm:h-64 xl:h-64 2xl:h-96 mb-5">
      <h3 className='text-muted text-center'>Choose What You Need</h3>
      <br/>
    <Carousel
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }}
      slide={true}
    >
      {categories.map((category, index) => (
        <div style={{marginLeft: "25px", marginTop: "20px"}}>
        <Link to={`/categories/${category.id}`}>
        <img className='imgCateg'
          key={index}
          src={`https://res.cloudinary.com/deg0m2eu4/${category.image}`}
          style={{width: "75%", marginLeft: "20px", marginTop: "20px"}}
          alt={category.name}
        />
        </Link>
        <h3 className='text-muted' style={{ marginRight: "35px",marginTop: "20px", textAlign: "center"}}>{category.name}</h3>
        </div>
        
      ))}
    </Carousel>
    <br/>
  </div>
);
    
};

export default ShowCategory;