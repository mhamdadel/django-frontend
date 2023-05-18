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


const AddToWishlist = (id) => {
  setIsLoading(true);

  const response = axios.post(
      `http://localhost:8000/wishlist/add/ `,
      { id },
      {
          withCredentials: true,
      }
  )
  .then((res) => {
    setIsLoading(false)
      toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        }
        );
        if(res.data.non_field_errors[0]){
          setIsLoading(false)
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



  return (
   

<>
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
<div className="container">
<ToastContainer />
		<div className="card">
			<div className="container">
				<div className="wrapper row">
					<div className="preview col-md-12 col-lg-6 col-sm-12">
            <img src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`}  alt=''/>
						
					</div>
					<div className="details col-md-6 col-lg-6 pt-5">
						<h3 className="product-title">{product.title}</h3>
						
						<p className="product-description text-center text-muted">{product.description}</p>
						<h4 className="price text-muted" >current price: <span style={{color:'#9ea18e'}}>${product.price}</span></h4>
						<div className="action text-center">
            {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (	<button className="add-to-cart btn  me-3" type="button" style={{backgroundColor:'#9ea18e',color:'white'}} onClick={() => addToCart(product.id)} >Add to cart</button>)}
                                         {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (
							<button className="like btn   "style={{backgroundColor:'#9ea18e',color:'white'}} type="button"onClick={() => AddToWishlist(product.id)}><span className="fa fa-heart"></span></button>
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