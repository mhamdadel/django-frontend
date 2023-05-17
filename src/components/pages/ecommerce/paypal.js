import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { redirect, useParams } from "react-router-dom";

const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency,
  showSpinner,
  isSubmitting,
  setIsSubmitting,
  submitSuccess,
  setSubmitSuccess, }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitSuccess, setSubmitSuccess] = useState(false);
  const { id } = useParams();
  const getCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/`, {
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

  // function hamo(){
  //   cart.map((item) => {
  //       item.cart_items.map((element) => {
  //           const quantity = element.quantity;
  //           const price = element.product_details.price;
  //           const product_id= element.product_details.id;
  //       })
        
  //   })

  // }


//   const addOrder = () => {
//     try {
//         const response = axios.post(
//             `http://localhost:8000/orders/add_order/ `,
//             {
//                 withCredentials: true,
//             }
//         );
//         console.log("product added to orders:");
//         setOrder([...order, response.data]);
//     } catch (error) {
//         console.error("Error adding product to orders:", error);
//     }
// };




  const amount = sumTotal()
  useEffect(() => {
    getCart();
    // sumTotal();
  }, []);
  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);


  return (
    <>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        onClick={()=> getCart()}
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
          return actions.order.capture().then(function (details) {
            alert("transaction completed"+" "+details.payer.name.given_name);
            setIsSubmitting(true)
            setSubmitSuccess(true)
  
          })


        }}
        onError = {function (data, actions) {
          return actions.order.capture().then(function () {
            alert("An Error occured with your payment ");
          })
        }}

      />

    </>
  );
};

function Paypal({
  isSubmitting,
  setIsSubmitting,
  submitSuccess,
  setSubmitSuccess,
}) {
  console.log("Paypal props: isSubmitting = ", isSubmitting);
  console.log("Paypal props: submitSuccess = ", submitSuccess);
  // const [{ isLoaded, loadError }] = usePayPalScriptReducer();

  // if (!isLoaded && !loadError) {
  //   return <div>Loading...</div>;
  // }

  // if (loadError) {
  //   return <div>Error loading PayPal script!</div>;
  // }
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZSu-G7VKYxLhsarNuPOZepyvipLrFu1UMkoKC-NetpBhrlA8AdQ8oy91VcD-l1vYwIKOyvDshJCyOKM",
          components: "buttons",
          currency: "USD",
        }}
      >
<ButtonWrapper currency={currency} showSpinner={false} isSubmitting={isSubmitting} submitSuccess={submitSuccess} setIsSubmitting={setIsSubmitting} setSubmitSuccess={setSubmitSuccess} />    
  </PayPalScriptProvider>
    </div>
  );
}
export default Paypal;
