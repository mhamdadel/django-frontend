import React from "react";
import "../styles/trendingProducts.css";

function TrendingProducts() {
    return (
        <div className="trending-products mb-5 pb-5">
            <div className="title">
                <h5 className="text-center text-blueGray-600 mt-5">
                    Welcome To Our
                </h5>
                <h3 className="text-center mb-5">Trending Products</h3>
            </div>

            <div className="row">
                <div className="card m-auto col-lg-3 col-md-12 col-sm-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            className="rounded-t-lg"
                            src="https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1458.jpg?size=626&ext=jpg&ga=GA1.1.1132134030.1683851481&semt=sph"
                            alt=""
                        />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">
                                Laptop
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Gaming Laptop - 12th i5-12450H 8-Cores, 8GB RAM,
                            512GB SSD.
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Price 27500 EGP
                        </p>
                        {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a> */}
                    </div>
                </div>

                <div className="card m-auto col-lg-3 col-md-12 col-sm-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            className="rounded-t-lg"
                            src="https://i1.adis.ws/i/egl/24689904_NOCOLOUR_M?$PDP_main_portrait_desktop$&layer0=[top=0&left=0]"
                            alt=""
                        />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Play Station 5
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            New gaming possibilities that you never anticipated.
                        </p>
                        {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a> */}
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Price 20000 EGP
                        </p>
                    </div>
                </div>
                <div className="card m-auto col-lg-3 col-md-12 col-sm-12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            className="rounded-t-lg"
                            src="https://img.freepik.com/premium-photo/new-white-wireless-ear-full-size-headphones-isolated-white-background-clipping-path_252965-1158.jpg?size=626&ext=jpg&ga=GA1.2.1132134030.1683851481&semt=ais"
                            alt=""
                        />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Wireless Headphones
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Wireless Bluetooth-compatible Headphones With Mic
                            Stereo Sound.
                        </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Price 5000 EGP
                        </p>
                        {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
                        {/* </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendingProducts;
