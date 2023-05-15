 import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, CardHeader} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/ShowProducts.css';

const addToWishlist =  (id) => {
  try {
    const response =  axios.post(`http://localhost:8000/wishlist/${id} `,{          withCredentials: true
  });
    console.log('product added to wishlist:');
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
  }
}
const ShowProduct = () => {
 
  const [products, setproducts]= useState([]);

  const getProducts = async ()=> {
    try {
      const response = await axios.get('http://localhost:8000/api/ecommerce/productslist/');
      setproducts(response.data.results);
    } catch (error) {
      console.log(error);
  }
  }
  useEffect(()=>{
    getProducts()
  },[]);
  return (
    <div className='products-card-info'>

    {products.map((product) => (
      <Card className='m-2 rounded shadow-lg ' style={{width: "22rem"}}>
      <Card.Img className='mx-auto' style={{width: "30%"}} variant="top" src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`} />        <Card.Body>
          <Card.Header className='text-center font-weight-bold'>{product.title}</Card.Header>
          <Card.Text className='text-center'>{product.description}</Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Text>inStock: {product.inStock}</Card.Text>
            <Card.Text>Price : {product.price}</Card.Text>
          </div>
          <Button variant="primary">Add To Cart</Button>
          <Link to={'/wishlist'}  onClick={() => addToWishlist(product.id)}className='far fa-heart	px-3 py-2 text-danger'>
          </Link>

        </Card.Body>
      </Card>
    ))}
  
  </div>
        
);
    
};

export default ShowProduct;