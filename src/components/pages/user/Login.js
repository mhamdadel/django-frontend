/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { backendServer } from "../../../env";
// import logo from "../assets/images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import Swal from "sweetalert2";
import './styles/login.css'
import gif from '../../assets/images/image_processing20190811-6096-xrwkqk.gif'
function Login() {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const signIn = useSignIn();
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        let fieldValue = e.target.value;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: fieldValue,
        }));
    };

    useEffect(() => {
        isAuthenticated() && navigate('/');
    }, [])

    const loginUser = async () => {
        try {
            const response = await axios.post(
                backendServer + "/api/auth/login/",
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
            const MapErrors = error?.response?.data?.non_field_errors?.map(err => {
                return err;
            }).join('\n');
            return Swal.fire({
                icon: "error",
                title: "Error when login",
                text: MapErrors
            });
        }
    };
    return (
        <section className="flex-wrap pb-5 pt-5">
          <div className="logincontainer w-full lg:w-6/12 md:w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <div className="lg:w-6/12 md:w-full">
              <img src={gif} className="w-full" alt="Login gif" />
            </div>
            <div className="loginsec lg:w-6/12 md:w-full">
              <h2 className="text-center pt-5" id="h2">Login Form</h2>
              <form
                id="loginform"
                className="mx-auto space-y-6 md:space-y-6 md:ms-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 pe-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 pe-3 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={userData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="logbutton w-full btn btn-success bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-1 text-center text-black dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={() => loginUser()}
                >
                  Login
                </button>
                <p className="ms-5 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-sm text-success dark:text-stone-800"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      );
}

export default Login;
