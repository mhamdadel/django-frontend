import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card, CardHeader } from "react-bootstrap";
import { Link, BrowserRouter, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./styles/ShowProducts.css";
import withLoader from "../user/components/loader";
import { MagnifyingGlass } from "react-loader-spinner";
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
        try {
            const response = axios.post(
                `http://localhost:8000/wishlist/add/ `,
                { id },
                {
                    withCredentials: true,
                }
            );
            console.log("product added to wishlist:");
            setWish([...wishList, response.data]);
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
        }
    };

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

    // useEffect(() => {
    //   setIsLoading(true);
    //    axios.get(
    //        `http://127.0.0.1:8000/api/ecommerce/productslist/`
    //      )
    //      .then((res) => {
    //         setproducts(res.data.results);
    //         setTotalPages(res.data.count);
    //         setIsLoading(false);

    //      })
    //      .catch((err) => {
    //        console.log(err);

    //      });
    //  }, []);

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
          const urlProducts = `http://127.0.0.1:8000/api/ecommerce/productslist/?page=${currentPage}${filter}`;
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

    // const addToCart = (id) =>{
    //   try{
    //     const response= axios.post(`http://localhost:8000/cart/add/`,{id},{
    //       withCredentials: true
    //     });
    //     console.log(response.data);
    //   }catch(error){
    //     console.log(error);
    //   }
    // }

    function addToCart(id) {
        axios
            .post(
                `http://localhost:8000/cart/add/`,
                { id },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => console.log(error));
    }

    // useEffect(()=>{
    //   getProducts()
    // },[]);
    useEffect(() => {
        if (isLoading) {
            document.body.classList.add("loading");
        } else {
            document.body.classList.remove("loading");
        }
    }, [isLoading]);

    return (
        <div className="container">
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
        sort by :
        <select value={sorting} onChange={handleSortingChange}>
            <option value="1">low to high price</option>
            <option value="0">high to low price</option>
        </select>
            {isLoading ? (
                <withLoader>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperclassName="MagnifyingGlass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </withLoader>
            ) : (
                <div className="products-card-info mx-auto">
                    {products.map((product, index) => (
                        <Card
                            className="m-2 rounded shadow-lg "
                            style={{ width: "22rem" }}
                            key={index}
                        >
                            <Link to={`/products/${product.id}`}>
                                <Card.Img
                                    className="mx-auto"
                                    variant="top"
                                    src={`https://res.cloudinary.com/deg0m2eu4/${product.Image}`}
                                />
                            </Link>
                            <Card.Body>
                                <Card.Header className="text-center">
                                    {product.title}
                                </Card.Header>
                                <Card.Text className="text-center">
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
                                <div className="flex">
                                    <Button
                                        onClick={() => addToCart(product.id)}
                                        variant="primary"
                                    >
                                        Add To Cart
                                    </Button>
                                    <a
                                        onClick={() =>
                                            AddToWishlist(product.id)
                                        }
                                    >
                                        <i className="far fa-heart px-3 py-2 text-danger"></i>
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
            ;
            {isLoading ? (
                <withLoader></withLoader>
            ) : (
                <div className="pagination justify-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< previous"
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
    );
};

export default ShowProduct;
