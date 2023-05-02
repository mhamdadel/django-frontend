import Home from "./pages/Home";
import Profile from "./pages/Profile";

export const nav = [
    { path: '/', name: 'Home', element: <Home />, isMenu: true},
    { path: '/', name: 'Profile', element: <Profile />, isMenu: true}
]

export default nav;