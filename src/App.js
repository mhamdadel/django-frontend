import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/pages/Home";
import EditableProfile from "./components/pages/user/EditableProfile";
import Register from "./components/pages/FuncRegister";
import Login from "./components/pages/Login";
import { RequireAuth } from "react-auth-kit";
import OrderDetails from "./components/pages/user/OrderDetails";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<OrderDetails />} />
                <Route
                    path="/profile"
                    element={
                        <RequireAuth loginPath="/login">
                        <EditableProfile />
                        </RequireAuth>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>Error 404</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
