import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { RequireAuth } from "react-auth-kit";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/profile"
                    element={
                        <RequireAuth loginPath="/register">
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
