import axios from "axios";
import "./styles/profile.css";
import React, { useState , useEffect} from "react";
import Swal from "sweetalert2";
import { MagnifyingGlass } from 'react-loader-spinner';
import withLoader from "../user/components/loader";
import '../user/styles/loader.css'
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
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveProfile = () => {
        setIsLoading(true); 
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/profile/`,{
                email: email,
                first_name: firstName,
                last_name: lastName,
                phone_number: mobileNumber,
                zip_code: zipCode,
                city: city,
                state: state,
                country: country,
            } ,{
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
                setIsLoading(false); 
                Swal.fire('Success', "Your Profile has been Updated Successfully", 'success')
            })
            .catch((err) => {
                Swal.fire('Error', err.message, 'error');
            });
    };

    useEffect(() => {
        if (isLoading) {
          document.body.classList.add('loading');
        } else {
          document.body.classList.remove('loading');
        }
      }, [isLoading]);

    useState(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/profile`, {
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
        <section className=" container dark:bg-gray-900 mt-8">
            <div className="pflex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-cente font-semibold text-gray-900 dark:text-white"
                >
                    {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                    <h2 className="text-right profilePage">Account Settings</h2>
                </a>
                {/* <div>
                    <h5>{firstName} {lastName}</h5>
                </div> */}
                <hr className=" mb-8"/> <div>
                <img className="imageIcon" src="https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_640.png"/>

                {/* className="flex flex-row" */}
                <div className="profile shadow container rounded mb-5 mt-8">
                    <div className="row">
                        <div className="col-md-8 border-right mx-auto">
                            <div className="py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12 col-lg-6 col-sm-12">
                                        <label className="labels">First Name</label>
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
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <label className="labels">Last Name</label>
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
                                    <div className="profileInput col-md-12 col-lg-12">
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
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12 col-lg-6">
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
                                    <div className="zipInput col-md-12 col-lg-2 mt-8">
                                        <label className="labels">Zip Code</label>
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
                                <div className= "places row mt-3">
                                    <div className="col-md-12 col-lg-3">
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
                                    <div className="state ml-8 mr-8 col-md-12 col-lg-3">
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
                                    <div className=" col-md-12 col-lg-3">
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
                                    </div>
                                    <div className="row mt-3">
                                    <div className="profileInput col-md-12 col-lg-12">
                                        <label className="labels">Password</label>
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
            </withLoader>            ) : (  <button
                                        className=" btn profile-button"
                                        type="button"
                                        onClick={handleSaveProfile}
                                    >
                                        Save Profile
                                    </button>)}
                                </div>
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
