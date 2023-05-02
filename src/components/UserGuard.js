import { Navigate } from 'react-router';
const useAuth = () => {
    const user = {
        email: 'test@test.com',
        name: 'test',
        id: 'test',
        loggedIn: true
    }
    return user && user.loggedIn;
}

const UserGuard = ({ children }) => {
    const isAuth = useAuth();
    return isAuth ? <>{children}</> : <Navigate to="/" />;
  };
  
  export default UserGuard;