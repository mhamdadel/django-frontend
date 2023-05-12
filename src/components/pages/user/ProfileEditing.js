import axios from "axios";
import "./styles/profile.css";
import React, { useState } from "react";

function Profile() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");

    const handleSaveProfile = () => {};

    useState(() => {
        axios
            .get("http://localhost:8000/api/auth/profile", {
                withCredentials: true,
            })
            .then((res) => {
                setEmail(res.data.email);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setMobileNumber(res.data.phone_number);
                setZipCode(res.data.zip_code);
                setCity(res.data.city);
                setState(res.data.state);
                setCountry(res.data.country);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                    <h2 className="text-right">Profile Settings</h2>
                </a>
                <div className="container rounded bg-white mb-5">
                    <div className="row">
                        <div className="col-md-8 border-right mx-auto">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="labels">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">first name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="first name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={lastName}
                                            placeholder="last name"
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="enter phone number"
                                            value={mobileNumber}
                                            onChange={(e) =>
                                                setMobileNumber(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Zip code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Zip code"
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="city"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={state}
                                            placeholder="state"
                                            onChange={(e) =>
                                                setState(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">Country</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="country"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button
                                        className="btn btn-primary profile-button"
                                        type="button"
                                        onClick={handleSaveProfile}
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
