 import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, CardHeader} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles/ShowProducts.css';
import ReactPaginate from 'react-paginate';
const ShowProduct = () => {
 
  const [products, setproducts]= useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] =  useState(1);
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    setIsLoading(true);
     axios
       .get(
         `http://127.0.0.1:8000/api/ecommerce/productslist/`
       )
       .then((res) => {
          setproducts(res.data.results);
          setTotalPages(res.data.count);
          setIsLoading(false);
        
       })
       .catch((err) => {
         console.log(err);
         setIsLoading(false);
       });
   }, []);
  const handlePageClick = (e)=> {

   setCurrentPage((e.selected + 1));
  }

  useEffect( ()=>{

    axios.get(`http://127.0.0.1:8000/api/ecommerce/productslist/?page=${currentPage}`)
    .then((response)=>{setproducts(response.data.results)});
    console.log(setproducts); 

  }, [currentPage])

  
  return (
    <div>

   
    <div className='products-card-info'>
    {products.map((product, index) => (
      <Card className='m-2 rounded shadow-lg ' style={{width: "22rem"}} key={index}>
      <Card.Img className='mx-auto' style={{width: "30%"}} variant="top" src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`} /><Card.Body>
          <Card.Header className='text-center'>{product.title}</Card.Header>
          <Card.Text className='text-center'>{product.description}</Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Text>inStock: {product.inStock}</Card.Text>
            <Card.Text>Price : {product.price}</Card.Text>
          </div>
          <Button variant="primary">Add To Cart</Button>
          <Link to={'wishList'} className="far fa-heart	px-3 py-2 text-danger"></Link>

        </Card.Body>
      </Card>
    ))}
  </div>

  <div className="pagination">
  <ReactPaginate
    breakLabel="..."
    nextLabel="next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={totalPages}
    previousLabel="< previous"
    renderOnZeroPageCount={null}
    breakClassName={"page-item"}
    breakLinkClassName={"page-link"}
    containerClassName={"pagination"}
    pageClassName={"page-item"}
    pageLinkClassName={"page-link"}
    previousClassName={"page-item"}
    previousLinkClassName={"page-link"}
    nextClassName={"page-item"}
    nextLinkClassName={"page-link"}
    activeClassName={"active"}
  />
</div>
  </div>

        
);
    
};

export default ShowProduct;