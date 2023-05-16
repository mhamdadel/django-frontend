import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useParams } from "react-router-dom";

const currency = "EGP";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [total, setTotal] = useState({});
  const { id } = useParams();
  const getCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/`, {
        withCredentials: true,
      });
      if (response.data) {
        setCart(response.data.cart_items);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
      setCart([]);
    }
  };

  function sumTotal(){
    let mult=0;
    let sum=0;
    cart.map((item) => {
        item.cart_items.map((element) => {
            const quantity=element.quantity;
            const price = element.product_details.price;
             mult += quantity*price;
        })
        
    })
     sum = mult +50;
     return sum;
  }
  
  useEffect(() => {
    getCart();
  }, []);
  // useEffect(() => {
  //     dispatch({
  //         type: "resetOptions",
  //         value: {
  //             ...options,
  //             currency: currency,
  //         },
  //     });
  // }, [currency, showSpinner]);

  const amount = sumTotal();

  return (
    <>
      {/* { (showSpinner && isPending) && <div className="spinner" /> } */}
      <PayPalButtons
        // style={style}
        // disabled={false}
        // forceReRender={[amount, currency, style]}
        // fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          });
          // .then((orderId) => {
          //     // Your code here after create the order
          //     return orderId;
          // });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            alert("transaction completed");
          });
        }}
      />
    </>
  );
};

function Paypal() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZSu-G7VKYxLhsarNuPOZepyvipLrFu1UMkoKC-NetpBhrlA8AdQ8oy91VcD-l1vYwIKOyvDshJCyOKM",
          components: "buttons",
          currency: "EGP",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
export default Paypal;
