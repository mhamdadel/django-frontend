import React from "react";
import axios from "axios";
import { useState } from "react";
// import logo from "../assets/images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import Swal from "sweetalert2";
function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const signIn = useSignIn();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: fieldValue,
        }));
    };
    const loginUser = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/login",
                {
                    email: userData.email,
                    password: userData.password,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.data.statusCode === 401) {
                return Swal.fire({
                    icon: "error",
                    title: "Error when login",
                    text: response.data.message,
                });
            }
            signIn({
                expiresIn: 7 * 24 * 60 * 60,
                tokenType: "bearer",
                authState: {
                    email: userData.email,
                },
            });
            navigate("/");
        } catch (error) {
            // return { error: error.message };
            return Swal.fire({
                icon: "error",
                title: "Error when login",
                text: error.message,
            });
        }
    };
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        {/* <img src={logo} alt="" /> */}
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@gmail.com"
                                        required=""
                                        value={userData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={userData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full btn btn-success bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={() => loginUser()}
                                >
                                    Login
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
