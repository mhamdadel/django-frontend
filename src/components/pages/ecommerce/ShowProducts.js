 import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, CardHeader} from 'react-bootstrap';
import './styles/ShowProducts.css';
const ShowProduct = () => {
 
  const [products, setproducts]= useState([]);

  const getProducts = async ()=> {
    const response = await axios.get('http://localhost:8000/api/ecommerce/productslist/');
    setproducts(response.data.results);
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
        </Card.Body>
      </Card>
    ))}
  
  </div>
        
);
    
};

export default ShowProduct;