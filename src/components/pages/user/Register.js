import React, { useState, useEffect } from "react";
import ValidatorClass from "../../../validatorClass";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import "../styles/register.css";

function Register() {
    const passwordMatch = (confirmation, state) =>
        state.password === confirmation;

    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    useEffect(() => {
        isAuthenticated() && navigate("/");
    }, []);
    const validator = new ValidatorClass([
        {
            field: "first_name",
            method: (value) => value.length >= 5,
            validWhen: true,
            message: "First name must be at least 5 characters long.",
        },
        {
            field: "first_name",
            method: (value) => value.length <= 255,
            validWhen: true,
            message: "First name must be at most 255 characters long.",
        },
        {
            field: "last_name",
            method: "isEmpty",
            validWhen: false,
            message: "Enter last name.",
        },
        {
            field: "last_name",
            method: (value) => value.length >= 2,
            validWhen: true,
            message: "Last name must be at least 2 characters long.",
        },
        {
            field: "last_name",
            method: (value) => value.length <= 50,
            validWhen: true,
            message: "Last name must be at most 50 characters long.",
        },
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Enter your email address.",
        },
        {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "Enter valid email address.",
        },
        {
            field: "phone",
            method: "isEmpty",
            validWhen: false,
            message: "Enter a phone number.",
        },
        {
            field: "phone",
            method: "matches",
            args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
            validWhen: true,
            message: "Enter valid phone number.",
        },
        {
            field: "phone",
            method: (value) => value.length >= 10,
            validWhen: true,
            message: "Phone number must be at least 10 digits long.",
        },
        {
            field: "phone",
            method: (value) => value.length <= 15,
            validWhen: true,
            message: "Phone number must be at most 15 digits long.",
        },
        {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Enter password.",
        },
        {
            field: "password_confirmation",
            method: "isEmpty",
            validWhen: false,
            message: "Enter Password confirmation.",
        },
        {
            field: "password_confirmation",
            method: passwordMatch,
            validWhen: true,
            message: "Password and password confirmation do not match.",
        },
        {
            field: "country",
            method: "isEmpty",
            validWhen: false,
            message: "Enter your country.",
        },
        {
            field: "country",
            method: (value) => value.length <= 50,
            validWhen: true,
            message: "Country must be at most 50 characters long.",
        },
        {
            field: "state",
            method: "isEmpty",
            validWhen: false,
            message: "Enter your state.",
        },
        {
            field: "state",
            method: (value) => value.length <= 50,
            validWhen: true,
            message: "State must be at most 50 characters long.",
        },
        {
            field: "city",
            method: "isEmpty",
            validWhen: false,
            message: "Enter your city.",
        },
        {
            field: "city",
            method: (value) => value.length <= 50,
            validWhen: true,
            message: "City must be at most 50 characters long.",
        },
    ]);

    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        password: "",
        password_confirmation: "",
        validation: validator.valid(),
    });
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        password: "",
        zip_code: "",
        password_confirmation: "",
        validation: validator.valid(),
    });

    const [submitted, setSubmitted] = useState(false);

    const validation = submitted ? validator.validate(state) : state.validation;

    const handleInputChange = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const validation = validator.validate(state);
        setState({
            ...state,
            validation,
        });
        setSubmitted(true);
        if (validation.isValid) {
            axios
                .post("http://localhost:8000/api/auth/register/", {
                    first_name: state.first_name,
                    last_name: state.last_name,
                    email: state.email,
                    phone: state.phone,
                    city: state.city,
                    state: state.state,
                    country: state.country,
                    password: state.password,
                    password2: state.password_confirmation,
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    };

    return (
        <div id="register">
            <section className="flex flex-row dark:bg-gray-900 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div
                    className="items-center justify-center px-6 py-8 md:h-screen lg:py-0"
                    id="widForm"
                >
                    <div>
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"></h1>
                            <form className="registrationForm" onClick={(e) => e.preventDefault()}>
                                <a
                                    href="#"
                                    className="flex items-center mb-8 mx-auto text-2xl font-semibold text-gray-900 dark:text-white"
                                >
                                    {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                                    Create an Account
                                </a>
                                <div
                                    className={
                                        validation.first_name.isInvalid
                                            ? ""
                                            : "has-error"
                                    }
                                >
                                    <div className="flex flex-row">
                                        <div>
                                            <label htmlFor="first_name">
                                                First Name
                                            </label>
                                            <input
                                                type="string"
                                                className="form-control mr-8"
                                                name="first_name"
                                                placeholder="First Name"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation.first_name
                                                    .message ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {
                                                            validation
                                                                .first_name
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                validation.last_name.isInvalid
                                                    ? ""
                                                    : "has-error"
                                            }
                                        ></div>
                                        <div>
                                            <label htmlFor="last_name">
                                                Last Name
                                            </label>
                                            <input
                                                type="string"
                                                className="form-control"
                                                name="last_name"
                                                placeholder="Last Name"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation.last_name
                                                    .message ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {
                                                            validation.last_name
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            validation.email.isInvalid
                                                ? ""
                                                : "has-error"
                                        }
                                    ></div>
                                    <div className="flex flex-row">
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control mr-8"
                                                name="email"
                                                placeholder="Email"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation.email.message ||
                                                errors.email.length > 0 ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {validation.email
                                                            .message ||
                                                            errors.email[0]}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                validation.phone.isInvalid
                                                    ? ""
                                                    : "has-error"
                                            }
                                        ></div>
                                        <div>
                                            <label htmlFor="phone">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                placeholder="Phone Number"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation.phone.message ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {
                                                            validation.phone
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div>
                                        <div className=" mr-8">
                                            <label htmlFor="city">
                                                zip code
                                            </label>
                                            <input
                                                type="string"
                                                className="form-control"
                                                name="zip_code"
                                                placeholder="zip code"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className=" mr-8">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="string"
                                                className="form-control"
                                                name="city"
                                                placeholder="City"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div>
                                        <div className=" ml-8 mr-8">
                                            <label htmlFor="state">State</label>
                                            <input
                                                type="string"
                                                className="new form-control"
                                                name="state"
                                                placeholder="State"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className=" ">
                                            <label htmlFor="country">
                                                Country
                                            </label>
                                            <input
                                                type="string"
                                                className="new form-control x"
                                                name="country"
                                                placeholder="Country"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row">
                                    <div>
                                        <div
                                            className={
                                                validation.password.isInvalid
                                                    ? ""
                                                    : "has-error"
                                            }
                                        >
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control mr-8"
                                                name="password"
                                                placeholder="Password"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation.password.message ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {
                                                            validation.password
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        {" "}
                                        <div
                                            className={
                                                validation.password_confirmation
                                                    .isInvalid
                                                    ? ""
                                                    : "has-error"
                                            }
                                        >
                                            <label htmlFor="password_confirmation">
                                                Password Confirmation
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                placeholder="Password Confirmation"
                                                onChange={handleInputChange}
                                            />
                                            <span className="help-block">
                                                {validation
                                                    .password_confirmation
                                                    .message ? (
                                                    <span className="alert alert-danger d-block p-1">
                                                        {
                                                            validation
                                                                .password_confirmation
                                                                .message
                                                        }
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={handleFormSubmit}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src="https://assets.materialup.com/uploads/6102cce0-dc3c-42a3-ba0e-84d25f8a7cd3/preview.gif" />
                </div>
            </section>
        </div>
    );
}

export default Register;
