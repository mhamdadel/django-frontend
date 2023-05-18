import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import '../user/styles/loader.css'
import { MagnifyingGlass } from 'react-loader-spinner';
import withLoader from "../user/components/loader";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Paypal from "./paypal";
import { Button } from "react-bootstrap";

function Cart() {
    const[cart,setCart]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [transactionsData, setTransactionData] = useState({});

    const [formData, setFormData] = useState({
        shipping_address: "",
        phone_number: "",
    });
    
    const handleChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    const create_order = () => {
        const cartData = cart.map((item) => {
            return item.cart_items.map((element) => ({
                quantity: element.quantity,
                price: element.product_details.price,
                product_id: element.product_details.id,
            }));
        });
        return cartData;
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const cartData = create_order();
            console.log(transactionsData);
            if (transactionsData.status = "COMPLETED") {
                await axios.post(
                    "http://localhost:8000/orders/add_order/",
                    {
                        ...formData,
                        cart_data: cartData,
                    },
                    {
                        withCredentials: true,
                    }
                );
                setSubmitSuccess(true);
            } else {
                alert("Please pay first");
            }
        } catch (error) {
            console.error(error);
            setSubmitSuccess(false);
        }
    };
    
    const getCart = async () => {
        try {
            const response = await axios.get("http://localhost:8000/cart/", {
                withCredentials: true,
            });
            if (response.data) {
                setCart(response.data);
            }
        } catch (error) {
            console.error(error);
            setCart([]);
        }
    };
    
    useEffect(() => {
        getCart();
    }, []);
    
    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [isLoading]);
    


      function handleDelete(id) {
          // console.log(id)
          setIsLoading(true);
          axios.delete(`http://localhost:8000/cart/${id}`,{
              withCredentials: true
          })
          .then((res)=>{
            // console.log(res.data.message)
            setIsLoading(false);
            getCart();
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000 
            });
            // setCart(cart.filter((item) => item.id !== id));
          })
          .catch((err)=>{
            // console.log(err)
            toast.error("An error occurred. Please try again later.");
          })

      }

    function updateCart(id,quantity){
        // console.log(quantity)
        setIsLoading(true);
        axios.put(`http://localhost:8000/cart/${id}`,{quantity},{
            withCredentials:true
        }).then((res)=>{
          setIsLoading(false);
          getCart()
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000 // number of milliseconds to display the message
          });
          // console.log(res.data)
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
        <ToastContainer />

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
                      {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (
                       <select id="cartq" className="form-control form-control-sm text-center" onChange={(e)=>updateCart(item.id,e.target.value)}>
                          <option value={item.quantity}>{item.quantity}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        )}
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">                       
                       <h5 className="mb-0">{item.product_details.price}</h5>
                      </div>
                      <div className="col-12 col-md-6 col-sm-6 col-lg-1 col-xl-1">
                      {isLoading ? (
 <withLoader>

</withLoader>
      ) : ( <button type="button" onClick={() => handleDelete(item.id)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></button>    )}         
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
    <center>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="orderCart block text-white   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  " type="button" onClick={() => {
      setShow(true)
    }} >Complete Your Order</button>
    </center>
    <>

<div id="authentication-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">complete your data please</h3>
                <form  onSubmit={handleSubmit}className="space-y-6" action="#">
                    <div>
                        <label htmlFor="shipping_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                        <input type="text" id="shipping_address" name="shipping_address" onChange={handleChange} value={formData.shipping_address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required/>
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" onChange={handleChange} value={formData.phone_number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
 
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>

                </form>
           
            </div>
        </div>
    </div>
    {show ?(
              <Paypal
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
                setTransactionData={setTransactionData}
                />
        ):null}
</div> 


</>


 
  </div>


        )}


        
</section>
</div>
    );
}
export default Cart