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
            .get("http://localhost:8000/api/auth/orders", {
                withCredentials: true,
            })
            .then((res) => {
                setOrders(res.data);

                console.log(res.data[0]);
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
                `http://localhost:8000/orders/orders/${order_id}/cancel/ `,
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
                                                        {orderCancelled !==
                                                            true && (
                                                            <button
                                                                onClick={() =>
                                                                    cancelOrder(
                                                                        order.order_id
                                                                    )
                                                                }
                                                                type="submit"
                                                                className="btn btn-danger"
                                                            >
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 flex items-center justify-end">
                                                        <button
                                                            id="apple-imac-27-dropdown-button"
                                                            data-dropdown-toggle="apple-imac-27-dropdown"
                                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                            type="button"
                                                        >
                                                            <svg
                                                                className="w-5 h-5"
                                                                aria-hidden="true"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            id="apple-imac-27-dropdown"
                                                            className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                        >
                                                            <ul
                                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                aria-labelledby="apple-imac-27-dropdown-button"
                                                            >
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    >
                                                                        Show
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href="#"
                                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a
                                                                    href="#"
                                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                >
                                                                    Delete
                                                                </a>
                                                            </div>
                                                        </div>
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
