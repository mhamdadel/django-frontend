import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";

function Cart() {
    const[cart,setCart]=useState([])
    const getCart = async ()=>{
        const respone = await axios.get('http://localhost:8000/cart/',{
            withCredentials: true
        })
        setCart(respone.data)
    }
    useEffect(()=>{
        getCart()
    },[])

    function handleDelete(id) {
        console.log(id)
       axios.delete(`http://localhost:8000/cart/${id}`,{
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data)
            getCart()
        })
        .catch((err)=>console.log(err))
    }

    function updateCart(id,quantity){
        console.log(quantity)
        axios.put(`http://localhost:8000/cart/${id}`,{quantity},{
            withCredentials:true
        }).then((res)=>{
            console.log(res.data)
        }) .catch((err)=>console.log(err))
    }

    return(
<div className=" container mx-auto">

<div className="relative overflow-x-auto">
    <table className="table">
        <thead>
            <tr>
                <th scope="col" className="p-2 px-3 text-uppercase">
                    Product 
                </th>
                <th scope="col" className="py-2 text-uppercase">
                    Price
                </th>
                <th scope="col" className="py-2 text-uppercase">
                    Quantity
                </th>
                <th scope="col" className="py-2 text-uppercase">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>
    {cart.map((cart)=>{
        return(
         <React.Fragment key={cart.id}>
          {cart.cart_items.map((item) => (
            <tr key={item.id}>
            <th scope="row" className="border-0">
               <div className="p-2 flex flex-row" id="prodName">
                 <img src={`https://res.cloudinary.com/deg0m2eu4/${item.product_details.Image}`} alt="" width="90" className="img-fluid rounded shadow-sm"/>
                 <div className="ml-3 inline-block align-middle">
              <h5 className="mb-0 inline-block align-middle">
                {item.product_details.title}
              </h5>
                 </div>
               </div>
             </th>
           <td className="border-0 align-middle">
            {item.product_details.price}
           </td>
           <td className="border-0 align-middle">
            <select onChange={(e)=>updateCart(item.id,e.target.value)}>
            <option value={item.quantity}>{item.quantity}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
           </select>
           </td>
           {/* <form id='form' className='validate' onSubmit={(e) => {
  e.preventDefault();
  handleSubmit(item.id);
}}> */}
           <td className="border-0 align-middle">
            <button type="button" onClick={() => handleDelete(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
           </td>
           {/* </form> */}
           </tr>
           ))}
           </React.Fragment>
        )
    })}

        </tbody>
    </table>
</div>


        </div>
    )
}
export default Cart