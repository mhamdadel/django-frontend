import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card, CardHeader } from "react-bootstrap";
import { Link, BrowserRouter, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./styles/ShowProducts.css";
import withLoader from "../user/components/loader";
import { MagnifyingGlass } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../user/styles/loader.css'

const ShowProduct = () => {
    const [products, setproducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [wishList, setWish] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchProductName, setSearchProductName] = useState("");
    const [sorting, setSorting] = useState();
    const [searchNow, setSearchNow] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const AddToWishlist = (id) => {
            setIsLoading(true);

            const response = axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/wishlist/add/ `,
                { id },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                setIsLoading(false)
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                  }
                  );
                  if(res.data.non_field_errors[0]){
                    toast.error(res.data.non_field_errors[0], {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                      })
                  }
                  console.log(res.data.non_field_errors[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }


    function handleCategoryChange(e) {
        setSearchCategory(e.target.value);
        setSearchNow(false);
        setTimeout(() => {
            setSearchNow(true);
        }, 1000);
    }

    function handleProductNameChange(e) {
        setSearchProductName(e.target.value);
        setSearchNow(false);
        setTimeout(() => {
            setSearchNow(true);
        }, 1000);
    }

    function handleSortingChange(e) {
        setSorting(e.target.value);
        setSearchNow(false);
        setTimeout(() => {
            setSearchNow(true);
        }, 1000);
    }


    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    };


    useEffect(() => {
        const category = searchParams.get('category');
        const isCategoryFilter = (category) => category && setSearchCategory(category);
        if (isCategoryFilter(category) || searchNow === true) {
          const categoryFilterDetails = category || searchCategory;
          let filter = "";
          categoryFilterDetails && (filter += "&category=" + categoryFilterDetails);
          searchProductName && (filter += "&product=" + searchProductName);
          sorting && (filter += "&sort=" + sorting);
          const urlProducts = `${process.env.REACT_APP_BACKEND_URL}/api/ecommerce/productslist/?page=${currentPage}${filter}`;
          console.log(urlProducts);
            axios
                .get(
                  urlProducts
                )
                .then((response) => {
                    setproducts(response.data.results);
                    setTotalPages(response.data.count);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(true);
                });
        }
    }, [currentPage, searchNow]);


    function addToCart(id) {
        setIsLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/cart/add/`,
                { id },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                setIsLoading(false);
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                  }
                  );
                  if(res.data.non_field_errors[0]){
                    toast.error(res.data.non_field_errors[0], {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                      })
                  }

                  console.log(res.data.non_field_errors[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [isLoading]);

    return (
        <div className="container">
            <div className="pSearch">
            <ToastContainer />

        <div class="container">
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
                <div>
        <input
            type="text"
            value={searchCategory}
            onChange={handleCategoryChange}
            placeholder="category"
        />
        <input
            type="text"
            value={searchProductName}
            onChange={handleProductNameChange}
            placeholder="product name"
        />
        Sort by: 
        <select value={sorting} onChange={handleSortingChange}>
            <option value="1">low to high price</option>
            <option value="0">high to low price</option>
        </select>
        </div>
            )}
            {isLoading ? (
                <withLoader>
                   
                </withLoader>
            ) : (
                <div className="products-card-info">
                    {products.map((product, index) => (
                        <Card
                            className="m-2 rounded shadow-lg "
                            style={{ width: "35rem" ,height: "90%"}}
                            key={index}
                        >
                            <Link to={`/products/${product.id}`}>
                                <Card.Img
                                    className=" image mx-auto"
                                    variant="top"
                                    src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`}
                                    
                                />
                            </Link>
                            <Card.Body>
                                <Card.Header className="text-center">
                                    {product.title}
                                </Card.Header>
                                <Card.Text className="text-center" style={{ marginTop: "20px" }}>
                                    {product.description}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Card.Text>
                                        inStock: {product.inStock}
                                    </Card.Text>
                                    <Card.Text>
                                        Price : {product.price}
                                    </Card.Text>
                                </div>
                                <hr/>
                                <div className="cart flex">
                                {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (
             
                                    <button className="butnCart"
                                        onClick={() => addToCart(product.id)}                               
                                    >
                                        Add To Cart
                                    </button>)}
                                    {isLoading ? (
 <withLoader>
 
</withLoader>
      ) : (
             
                                    <button className="like btn " type="button" style={{backgroundColor:'#9ea18e',color:'white',cursor:'pointer'}}
                                        onClick={() =>
                                            AddToWishlist(product.id)
                                        }>
                                        <span className="fa fa-heart"></span>
                                    </button>)}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )};
            {isLoading ? (
                <withLoader></withLoader>
            ) : (
                <div className="pagination justify-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={(totalPages.toFixed()) / 3}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
            )}
            ;
        </div>
        </div>
        </div>
    );
};

export default ShowProduct;
