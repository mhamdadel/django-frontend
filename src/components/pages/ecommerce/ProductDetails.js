/* eslint-disable react/jsx-no-undef */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import './styles/ProductDetails.css';
import { MagnifyingGlass } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../user/styles/loader.css'

const ProductDetails = () => {
  
  const { id } = useParams();
  let [product , setproduct] =  useState({});
  const [isLoading, setIsLoading] = useState(true);




useEffect(  ()=>{
  setIsLoading(true);
  axios.get(`http://localhost:8000/api/ecommerce/products/${id}`)
  .then((response) => {
    setproduct(response.data);
    setIsLoading(false);

  })
  .catch((error) => {console.log(error)});

}, []);
  

function addToCart(id) {
  setIsLoading(true);

  axios
      .post(
          `http://localhost:8000/cart/add/`,
          { id },
          {
              withCredentials: true,
          }
      )
      .then((res) => {
        setIsLoading(false);
          toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000
            }
            );
            if(res.data.non_field_errors[0]){
              toast.error(res.data.non_field_errors[0], {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000
                })
            }
            console.log(res.data.non_field_errors[0])
      })
      .catch((error) => {
          console.log(error)
      })
}
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
      {isLoading ? (
                <withLoader>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </withLoader>
            ) : (
<div class="container">
<ToastContainer />
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
            {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (					<button class="add-to-cart btn btn-default" type="button" onClick={() => addToCart(product.id)} >add to cart</button>)}
                                         {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (
							<button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
      )}
              </div>
					</div>
				</div>
			</div>
		</div>
	</div>
            )}
</>
);
    
};

export default ProductDetails;