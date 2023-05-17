import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";

import { MagnifyingGlass } from 'react-loader-spinner';
import withLoader from "../user/components/loader";
function Cart() {
    const[cart,setCart]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const getCart = async ()=>{
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/cart/`,{
            withCredentials: true
        })
        if(response.data){
          setCart(response.data);
          setIsLoading(false); 
        }
          }

    useEffect(()=>{
        getCart()
    },[])

    useEffect(() => {
      if (isLoading) {
        document.body.classList.add('loading');
      } else {
        document.body.classList.remove('loading');
      }
    }, [isLoading]);


    function handleDelete(id) {
        console.log(id)
        setIsLoading(true);
       axios.delete(`http://localhost:8000/cart/${id}`,{
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data)
            setIsLoading(false);
            getCart()
        })
        .catch((err)=>console.log(err))
    }

    function updateCart(id,quantity){
        console.log(quantity)
        setIsLoading(true);
        axios.put(`http://localhost:8000/cart/${id}`,{quantity},{
            withCredentials:true
        }).then((res)=>{
          setIsLoading(false);
            console.log(res.data)
        }).catch((err)=>console.log(err))
    }

    return(

<div className="cart container mx-auto">

<section>
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
  <div className="container h-100 py-5">
    <div className="row flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-10">

        <div className="flex justify-content-between align-items-center mb-4">
          <h3 className="fw-normal mb-3">Shopping Cart</h3>
        </div>
        
        {cart.map((cart)=>{
          return(
            <React.Fragment key={cart.id}>
              {cart.cart_items.map((item) => (
                <div className="card shadow border-0 rounded-3 mb-4" key={item.id}>
                  <div className="card-body p-4">
                    <div className="row flex justify-content-between align-items-center">
                      <div className="col-12 col-md-2 col-lg-2 col-xl-2 mb-3 mb-md-0">
                        <img
                          src={`https://res.cloudinary.com/deg0m2eu4/${item.product_details.Image}`}
                          className="img-fluid rounded-3" alt="" style={{height:'80px',width:'70px'}}/>
                      </div>
                      <div className="col-12 col-md-3 col-lg-3 col-xl-3 mb-3 mb-md-0">
                        <p className="lead fw-normal mb-2">{item.product_details.title}</p>
                        {/* <p><span className="text-muted">{item.product_details.Category}</span></p> */}
                      </div>
                      <div className="col-md-2 col-lg-3 col-xl-2 d-flex">
                        <select id="cartq" className="form-control form-control-sm text-center" onChange={(e)=>updateCart(item.id,e.target.value)}>
                          <option value={item.quantity}>{item.quantity}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">                       
                       <h5 className="mb-0">{item.product_details.price}</h5>
                      </div>
                      <div className="col-12 col-md-6 col-sm-6 col-lg-1 col-xl-1">
                        <button type="button" onClick={() => handleDelete(item.id)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></button>             
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  </div>
  // <ReactPaginate
  //         pageCount={totalPages}
  //         pageRangeDisplayed={5}
  //         marginPagesDisplayed={2}
  //         onPageChange={(data) => setCurrentPageNumber(data.selected + 1)}
  //         containerClassName={'pagination justify-content-center'}
  //         activeClassName={'active'}
  //       />
  
        )}
        <Link to= {'/order'}>Complete Your Order</Link>
</section>
</div>

    )
}
export default Cart