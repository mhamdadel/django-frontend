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
const ButtonWrapper = ({
    currency,
    showSpinner,
    isSubmitting,
    setIsSubmitting,
    submitSuccess,
    setSubmitSuccess,
    setTransactionData,
}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState({});
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

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

    function sumTotal() {
        let mult = 0;
        let sum = 0;
        cart.map((item) => {
            item.cart_items.map((element) => {
                const quantity = element.quantity;
                const price = element.product_details.price;
                mult += quantity * price;
            });
        });
        sum = mult + 50;

        return sum;
    }

    const amount = sumTotal();
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
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                onClick={() => getCart()}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            setOrderID(orderId);
                            console.log(orderId);
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        setTransactionData(details);
                        alert("form paypal" , details)
                        alert(
                            "transaction completed" +
                                " " +
                                details.payer.name.given_name
                        );
                        setIsSubmitting(true);
                        setSubmitSuccess(true);
                        console.log(actions.order.capture());
                    });
                }}
                onCancel={() => {
                    // cancelOrder()
                }}
                onError={function (data, actions) {
                    return actions.order.capture().then(function () {
                        setErrorMessage("An Error occured with your payment ");
                    });
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
    setTransactionData,
}) {
    console.log("Paypal props: isSubmitting = ", isSubmitting);
    console.log("Paypal props: submitSuccess = ", submitSuccess);
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
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    isSubmitting={isSubmitting}
                    submitSuccess={submitSuccess}
                    setIsSubmitting={setIsSubmitting}
                    setSubmitSuccess={setSubmitSuccess}
                    setTransactionData={setTransactionData}
                />
            </PayPalScriptProvider>
        </div>
    );
}
export default Paypal;
