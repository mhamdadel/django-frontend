/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withLoader from "./components/loader";
import { MagnifyingGlass } from "react-loader-spinner";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [orderCancelled,setOrderCancelled]= useState(false)

    const getOrders = ()=>{
         axios.get("http://localhost:8000/api/auth/orders",{
            withCredentials: true
          })
          .then((res)=> {
            setOrders(res.data);
    
            console.log(res.data[0])
            setIsLoading(false);
    
          })
          .catch(err => console.log(err));
    }
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/auth/orders", {
                withCredentials: true,
            })
            .then((res) => {
                setOrders(res.data);
                console.log(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, []);
    function getAmount(items) {
        const sumTotal = items.reduce((sum, current) => {
            return sum + current.price * current.quantity;
        }, 0);
        return sumTotal;
    }

    function areYouSureToCancel(orderId) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be cancel this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(
                        `http://localhost:8000/orders/orders/${orderId}/cancel/`,
                        { orderId },
                        {
                            withCredentials: true,
                        }
                    )
                    .then(() => {
                        Swal.fire(
                            "Canceled!",
                            "Your file has been deleted.",
                            "success"
                        );
                    })
                    .catch((err) => {console.log(err.message);})
            }
        });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
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
                                        cancel
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    return (
                                        <tr
                                            key={order.order_id}
                                            className="border-b dark:border-gray-700"
                                        >
                                            <td className="px-4 py-3">
                                                <Link
                                                    to={`/orders/${order.order_id}`}
                                                >
                                                    {order.order_id}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString("ar-EG")}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.shipping_address}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.phone_number}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.order_items.length}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getAmount(order.order_items)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.status}
                                            </td>
                                            <td className="px-4 py-3">
                                                {order.status !==
                                                "delivered" ? (
                                                    <a
                                                        onClick={() =>
                                                            areYouSureToCancel(
                                                                order.order_id
                                                            )
                                                        }
                                                        class="btn btn-danger"
                                                        href="#"
                                                        role="button"
                                                    >
                                                        Cancel
                                                    </a>
                                                ) : (
                                                    <a
                                                        type="button"
                                                        class="btn btn-primary"
                                                        disabled
                                                    >
                                                        delivered
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyOrders;
