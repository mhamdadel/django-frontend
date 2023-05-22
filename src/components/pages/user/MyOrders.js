/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withLoader from "./components/loader";
import { MagnifyingGlass } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderCancelled, setOrderCancelled] = useState(false);

    const getOrders = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/orders`, {
                withCredentials: true,
            })
            .then((res) => {
                handleSort(res.data)
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [isLoading]);

    const sumTotal = (order_items) => {
        return order_items.reduce((sum, current) => {
            return sum + (current.price * current.quantity);
        }, 0);
    };
    function handleSort(orders) {
        const sortedOrders = [...orders].sort((a, b) => a.order_id - b.order_id);
        setOrders(sortedOrders);
      }
    function updateOrder(id) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === id ? { ...order, status: "Cancel" } : order
          )
        );
      }
    const cancelOrder = (order_id) => {
        try {
            axios.post(
                `process.env.REACT_APP_BACKEND_URL/orders/orders/${order_id}/cancel/ `,
                {},
                {
                    withCredentials: true,
                }
            ).then((res) => {
                Swal.fire('success', 'you cancelled the order successfully.', 'success');
                updateOrder(order_id)
            })
            .catch((err) => console.log(err));
            setOrderCancelled(true);
        } catch (error) {
            console.error(error);
            setOrderCancelled(false);
        }
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
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
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            order id
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            ordered at
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            shipping address
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            phone number
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            product quantity
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            total
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            status
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            cancellation fees
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Cancel
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ToastContainer />

                                    {orders.length > 0 ? (
                                        orders.map((order) => {
                                            return (
                                                <tr
                                                    key={order.order_id}
                                                    className="border-b dark:border-gray-700"
                                                >
                                                    <td className="px-4 py-3">
                                                        <Link
                                                            to={`/orders/${order.order_id}`}
                                                            style={{
                                                                color: "#9ea18e",
                                                            }}
                                                        >
                                                            {order.order_id}{" "}
                                                            <i
                                                                className="far fa-hand-point-right"
                                                                style={{
                                                                    fontSize:
                                                                        "small",
                                                                }}
                                                            ></i>{" "}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString(
                                                            "EN-EG"
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.shipping_address}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.phone_number}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {
                                                            order.order_items
                                                                .length
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {sumTotal(order.order_items)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.status}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {
                                                            order.cancellation_fees
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {order.status.toLowerCase() !==
                                                            "cancelled" ? (
                                                            <button
                                                                onClick={() =>
                                                                    cancelOrder(
                                                                        order.order_id
                                                                    )
                                                                }
                                                                type="submit"
                                                                className="btn btn-danger"
                                                            >
                                                                {console.log(order.status)}
                                                                Cancel
                                                            </button>
                                                        ) : (<button className="btn btn-primary" disabled>Cancelled</button>)}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <div>No items in your Order page</div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default MyOrders;
