import React , { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Paypal from "./paypal";
import { Button } from "react-bootstrap";

function OrderForm() {
  const [formData, setFormData] = useState({
    shipping_address: "",
    phone_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [cart, setCart] = useState([]);

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
      console.log("Before Axios Post: isSubmitting = ", isSubmitting);
      console.log("Before Axios Post: submitSuccess = ", submitSuccess);
      await axios.post("http://localhost:8000/orders/add_order/",{
        ...formData,
        cart_data: cartData,
      }, {
        
        withCredentials: true,
      });
      console.log("After Axios Post: isSubmitting = ", isSubmitting);
      console.log("After Axios Post: submitSuccess = ", submitSuccess);
      console.log(formData);
      console.log(cartData);
      setFormData({
        shipping_address: "",
        phone_number: "",
        cart_data: [],

      });
      setSubmitSuccess(true);
      alert("Please pay first");


    } catch (error) {
      console.error(error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
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




  return (
    <>
       
        <form onSubmit={handleSubmit}>
          <label htmlFor="shipping_address">Address:</label>
          <input type="text" id="shipping_address" name="shipping_address" onChange={handleChange} value={formData.shipping_address} />

          <label htmlFor="phone_number">Phone Number:</label>
          <input type="text" id="phone_number" name="phone_number" onChange={handleChange} value={formData.phone_number} />
<br />
          <Button type="submit">Submit</Button>
          {/* {isSubmitting && alert('please pay first')} */}
        {/* {isSubmitting === false}{
            alert('please pay first')
          } */}
        </form>

              <Paypal
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}/>

    </>
  );
}
export default OrderForm