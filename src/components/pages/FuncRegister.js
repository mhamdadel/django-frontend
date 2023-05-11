import React, { useState } from "react";
import FormValidator from "../../registerValidator";
import axios from "axios";
function Register() {
    const passwordMatch = (confirmation, state) => state.password === confirmation;
    const validator = new FormValidator([
        {
            field: "username",
            method: (value) => /^[a-zA-Z0-9_-]+$/.test(value),
            validWhen: true,
            message:
                "Username can only contain alphanumeric characters, underscores, and hyphens.",
        },
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
            field: "username",
            method: "isEmpty",
            validWhen: true,
            message: "enter username.",
        },
        {
            field: "first_name",
            method: "isEmpty",
            validWhen: false,
            message: "Enter first name.",
        },
        {
            field: "first_name",
            method: (value) => value.length >= 2,
            validWhen: true,
            message: "First name must be at least 2 characters long.",
        },
        {
            field: "first_name",
            method: (value) => value.length <= 50,
            validWhen: true,
            message: "First name must be at most 50 characters long.",
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
    ]);

    const [state, setState] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        validation: validator.valid(),
    });
    const [submitted, setSubmitted] = useState(false);

    const validation = submitted ? validator.validate(state) : state.validation;
    const handleInputChange = (event) => {
        event.preventDefault();
        setState({
          ...state,
          [event.target.name]: event.target.value
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
                    username: state.username,
                    email: state.email,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    password: state.password,
                    password2: state.password_confirmation,
                })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="mx-auto col-md-9 col-md-offset-9">
                    <form className="registrationForm">
                        <h2 className="text-center">Registration form</h2>
                        <div
                            className={
                                validation.username.isInvalid ? "" : "has-error"
                            }
                        >
                            <label htmlFor="username">username</label>
                            <input
                                type="string"
                                className="form-control"
                                name="username"
                                placeholder="username"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.username.isInvalid ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.username.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.first_name.isInvalid
                                    ? ""
                                    : "has-error"
                            }
                        >
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="string"
                                className="form-control"
                                name="first_name"
                                placeholder="First Name"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.first_name.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.first_name.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.last_name.isInvalid
                                    ? ""
                                    : "has-error"
                            }
                        >
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="string"
                                className="form-control"
                                name="last_name"
                                placeholder="Last Name"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.last_name.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.last_name.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.email.isInvalid ? "" : "has-error"
                            }
                        >
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email address"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.email.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.email.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.email.isInvalid ? "" : "has-error"
                            }
                        >
                            <label htmlFor="phone">phone</label>
                            <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                name="phone"
                                placeholder="phone number"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.phone.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.phone.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.password.isInvalid ? "" : "has-error"
                            }
                        >
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.password.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {validation.password.message}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <div
                            className={
                                validation.password_confirmation.isInvalid
                                    ? ""
                                    : "has-error"
                            }
                        >
                            <label htmlFor="password_confirmation">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                name="password_confirmation"
                                onChange={handleInputChange}
                            />{" "}
                            <span className="help-block">
                                {validation.password_confirmation.message ? (
                                    <span className="alert alert-danger d-block p-1">
                                        {
                                            validation.password_confirmation
                                                .message
                                        }
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>{" "}
                        </div>
                        <button
                            onClick={handleFormSubmit}
                            className="mt-2 w-25 float-end btn bg-dark text-light"
                        >
                            {" "}
                            Register{" "}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
