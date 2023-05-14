import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ShowCategory = () => {
  const [categories, setcategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ecommerce/categories/');
      setcategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
   
      <div class="container">
        <div class="row">
          <div class="col">
            <h2>Categories</h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <fb-slider dots="true">
              {categories.map((category, index) => {
                return (
                  <fb-card > 
                    <img src={`https://res.cloudinary.com/deg0m2eu4/${category.image}`} alt={category.title} />
                    <h5>{category.title}</h5>
                  </fb-card>
                );
              })}
            </fb-slider>
          </div>
        </div>
      </div>
   
   
  );
};

export default ShowCategory;