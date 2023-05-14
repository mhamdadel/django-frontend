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

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/order" element={<OrderDetails />} />
                    <Route path="/profile" element={<Outlet />}>
                        <Route
                            path=""
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
