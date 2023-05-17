/* eslint-disable react/jsx-no-undef */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import './styles/ProductDetails.css';
const ProductDetails = () => {
  
  const { id } = useParams();
  let [product , setproduct] =  useState({});



useEffect(  ()=>{

  axios.get(`http://localhost:8000/api/ecommerce/products/${id}`)
  .then((response) => {
    setproduct(response.data);
  })
  .catch((error) => {console.log(error)});

}, []);
  
console.log(product);
  return (
   

<>
    {/* <div className='details'>
      <div className='big-img'> 
          <img src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`} alt={product.title}/>
      </div>
      <div className='box'>
        <div className='row'>
          <h2>{product.title}</h2>
          <span>${product.price}</span>
        </div>
        <p>{product.description}</p>
        <p></p>
      </div>
    </div> */}

<div class="container">
		<div class="card">
			<div class="container-fliud">
				<div class="wrapper row">
					<div class="preview col-md-6">
            <img src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`}  alt=''/>
						
					</div>
					<div class="details col-md-6">
						<h3 class="product-title">{product.title}</h3>
						
						<p class="product-description">{product.description}</p>
						<h4 class="price">current price: <span>${product.price}</span></h4>
						<div class="action">
							<button class="add-to-cart btn btn-default" type="button">add to cart</button>
							<button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</>
);
    
};

export default ProductDetails;