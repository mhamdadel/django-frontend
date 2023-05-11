import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/user/Profile";
import Register from "./components/pages/FuncRegister";
import Login from "./components/pages/Login";
import { RequireAuth } from "react-auth-kit";
import Navbar from "./components/common/navbar";
function App() {
    return (
        <div>
            <Navbar/>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/profile"
                    element={
                        <Profile />
                        // <RequireAuth loginPath="/register">
                        //     <Profile />
                        // </RequireAuth>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>

        </div>

    );
}

export default App;
