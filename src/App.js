import React from "react";
import {
    Route,
    Routes,
    BrowserRouter as Router,
    Outlet,
} from "react-router-dom";
import Home from "./components/pages/Home";
import withLoader from "./components/pages/user/components/loader";
import EditableProfile from "./components/pages/user/EditableProfile";
import Profile from "./components/pages/user/ProfileEditing";
import Register from "./components/pages/user/Register";
import Login from "./components/pages/user/Login";
import { RequireAuth } from "react-auth-kit";
import OrderDetails from "./components/pages/user/OrderDetails";
import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import NotFound from "./components/common/NotFound";
import MyOrders from "./components/pages/user/MyOrders";
import ShowCategory from "./components/pages/ecommerce/ShowCategories";
import CategoryDetails from "./components/pages/ecommerce/CategoryDetails";
import ShowProduct from "./components/pages/ecommerce/ShowProducts";
import ProductDetails from "./components/pages/ecommerce/ProductDetails";
import Cart from "./components/pages/ecommerce/Cart";
import GetWishlistItems from "./components/pages/ecommerce/wishList";
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories">
                        <Route index element={<ShowCategory />}></Route>
                    </Route>
                    <Route path="/products">
                        <Route index element={<ShowProduct />}></Route>
                        <Route path=":id" element={<ProductDetails />}></Route>
                    </Route>
                    <Route
                        path="/"
                        element={
                            <RequireAuth loginPath="/login">
                                <Outlet />
                            </RequireAuth>
                        }
                    >
                        <Route path="/profile" element={<Profile />} />

                        <Route path="/orders">
                            <Route index element={<MyOrders />}></Route>
                            <Route
                                path=":id"
                                element={<OrderDetails />}
                            ></Route>
                        </Route>
                        <Route path="/wishlist">
                            <Route index element={<GetWishlistItems />}></Route>
                        </Route>
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
