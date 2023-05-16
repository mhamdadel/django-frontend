import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState({});
    const [total, setTotal] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/auth/orders/${id}/`, {
                withCredentials: true,
            })
            .then((res) => {
                setOrderDetails(res.data);
                const sumTotal = res.data.order_items.reduce((sum, current) => {
                  return sum + (current.price * current.quantity)
                }, 0); 
                setTotal(sumTotal);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="container py-5 min-h-screen">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-8">
                    {orderDetails && orderDetails.order_items ? (
                        <div className="card" style={{ borderRadius: "10px" }}>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p
                                        className="lead fw-normal mb-0"
                                        style={{ color: "#a8729a" }}
                                    >
                                        Order
                                    </p>
                                    <p className="small text-muted mb-0">
                                        Order Number #{orderDetails.order_id}{" "}
                                    </p>
                                </div>

                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2">
                                        <p className="text-muted mb-0 small">
                                            Track Order
                                        </p>
                                    </div>
                                    <div className="col-md-10">
                                        <div
                                            className="progress"
                                            style={{
                                                height: "6px",
                                                borderRadius: "16px",
                                            }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width:
                                                        orderDetails.status ===
                                                        "pending"
                                                            ? "10%"
                                                            : orderDetails.status ===
                                                              "shipped"
                                                            ? "50%"
                                                            : orderDetails.status ===
                                                              "delivered"
                                                            ? "100%"
                                                            : "25%", // default width or error message
                                                    borderRadius: "16px",
                                                    backgroundColor: "#a8729a",
                                                }}
                                                aria-valuenow="65"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                        <div className="d-flex mb-1">
                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                {orderDetails.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {orderDetails.order_items.map((item) => (
                                    <div
                                        key={item.image}
                                        className="card shadow-0 border mb-4"
                                    >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img
                                                        src={`https://res.cloudinary.com/deg0m2eu4/${item.product.Image}`}
                                                        className="img-fluid"
                                                        alt="Phone"
                                                    />
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">
                                                        {item.product.title}
                                                    </p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small">
                                                        {(new Number(item.price)).toLocaleString(
                                                            "ar-EG",
                                                            {
                                                                style: "currency",
                                                                currency: "EGP",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <hr
                                                className="mb-4"
                                                style={{
                                                    backgroundColor: "#e0e0e0",
                                                    opacity: 1,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="card-footer border-0 px-4 py-5 row"
                                style={{
                                    backgroundColor: "#a8729a",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                }}
                            >
                                <h6 className="col-md-6 d-flex align-items-center justify-content-start text-white mb-2">
                                    address : {orderDetails.shipping_address}
                                    <br />
                                    phone : {orderDetails.phone_number}
                                </h6>
                                <h5 className="col-md-6 d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                    Total paid:{" "}
                                    <span className="h2 mb-0 ms-2">{
                                      total.toLocaleString('ar-EG', {
                                        style: "currency",
                                        currency: "EGP",
                                      })
                                    }</span>
                                </h5>
                            </div>
                        </div>
                    ) : (
                        <div role="status mt-2 mx-auto text-center">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 mx-auto mt-2.5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
