import React from "react";
import {
    Route,
    Routes,
    BrowserRouter as Router,
    Outlet,
} from "react-router-dom";
import Home from "./components/pages/Home";
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
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/orders" >
                        <Route index element={<MyOrders />}></Route>
                        <Route path=":id" element={<OrderDetails />}></Route>
                    </Route>
                    <Route path="/categories" >
                        <Route index element={<ShowCategory />}></Route>
                        <Route path=":id" element={<CategoryDetails />}></Route>
                    </Route>
                    <Route path="/profile" element={<Outlet />}>
                        <Route
                            index
                            element={
                                <RequireAuth loginPath="/login">
                                    <Profile />
                                </RequireAuth>
                            }
                        />
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