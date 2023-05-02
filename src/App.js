import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserGuard from "./components/UserGuard";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import { useEffect } from "react";
import axios from 'axios';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route element={<UserGuard />}>
                    <Route path="/profile" element={<Profile />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
