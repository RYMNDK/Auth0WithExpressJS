import'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-5und1roc.us.auth0.com"
const clientId = "a2kk4RMlM4RmOXykY7kjhRwK3DQKmoPW"

ReactDOM.render(
    <Auth0Provider
    domain = {domain}
    clientId = {clientId}
    redirectUri={window.location.origin}
    >

        <React.StrictMode>
            <App />
        </React.StrictMode>
    
    </Auth0Provider>,
    document.getElementById('root')
);

