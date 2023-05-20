import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import ReactPaginate from 'react-paginate';
import { Link, redirect } from "react-router-dom";
import '../user/styles/loader.css'
import { MagnifyingGlass } from 'react-loader-spinner';
import withLoader from "../user/components/loader";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Paypal from "./paypal";
import { Button } from "react-bootstrap";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Swal from "sweetalert2";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'30%'
  },
};

function Cart() {
    const[cart,setCart]=useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [transactionsData, setTransactionData] = useState({});
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const cartData = create_order();
            console.log(transactionsData);
            if (transactionsData.status === "COMPLETED") {
                axios.post(
                    "http://localhost:8000/orders/add_order/",
                    {
                        ...formData,
                        cart_data: cartData,
                    },
                    {
                        withCredentials: true,
                    }
                ).then((res) => {
                  Swal.fire('Success', 'Order Submitted successfully', 'success').then(() => {
                    redirect('/');
                  })
                  
                })

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
          // setIsLoading(true)
            const response = await axios.get("http://localhost:8000/cart/", {
                withCredentials: true,
            });
            if (response.data) {
              // setIsLoading(false)
                setCart(response.data);
            }
        } catch (error) {
            console.error(error);
            setCart([]);
        }
    };
    
    const showbutton=()=>{
      setShow(true)
      console.log("clicked")
    }

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
                       <h5 className="mb-0">$ {item.product_details.price}</h5>
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
    {/* <center>
    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="orderCart block text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={()=>{
      setShow(true)
    }} >Complete Your Order</button>
    </center> */}
    <>

    <div>
      <center>
      <button className="orderCart" onClick={openModal}>Complete Your Order</button></center>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg dark:bg-gray-700">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <form  onSubmit={handleSubmit}className="space-y-6" action="#">
                    <div>
                        <label htmlFor="shipping_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                        <input type="text" id="shipping_address" name="shipping_address" onChange={handleChange} value={formData.shipping_address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required/>
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input type="text" id="phone_number" name="phone_number" onChange={handleChange} value={formData.phone_number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    
                    <div className="btnMod flex flex-row">
                    <center>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-5" >Submit</button>
                    <button className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-5" onClick={closeModal}>Cancel</button>
                    </center>
                    </div>
                </form>
                </div>
                </div>  {modalIsOpen ?(
              <Paypal
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
                setTransactionData={setTransactionData}
                />
        ):null}
      </Modal>

    </div> 


</>


 
  </div>


        )}


        
</section>
</div>
    );
}
export default Cart