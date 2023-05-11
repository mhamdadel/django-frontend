import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AuthProvider} from 'react-auth-kit';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider authType={"localstorage"} authName={"user"}>
        {/* <Provider> */}
            <App />
        {/* </Provider> */}
    </AuthProvider>
);
