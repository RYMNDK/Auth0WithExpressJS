import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * [get messages]
 * @param  {[json]} identity [user identity returned by Auth0]
 * @return {[List]}          [List of secrets visible to {identity.name}}]
 */
function getMessages(identity){

    //todo:
    //pack this into jwt and send to backend

    /*
    axios({
        method: 'post',
        url: 'http://localhost:8000/getMessages',
        data: {
            "name": identity
        }
    })
    .then (res => {
        _secretMessages = ["message 1"];
        alert(res.data);
    }) 
    .catch (error => {
        alert(error);
    })
    */

    return ["Hard coded messages for " + identity.name];
}

/**
 * [Show Secret] 
 * @param  {[List]} secrets [A list of messages visible to logged in user]
 * @return {[Html]}         [A html unordered list view of {secrets}]
 */
function showSecret(secrets){
    if (secrets.length === 0)
        return(<p>No messages visible</p>);
    else {
        return (
            <ul>
              {secrets.map(secretMessage => (
                <li>{secretMessage}</li>
              ))}
            </ul>
        );
    }
}

function App() {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [secrets, setMessages] = useState([]);
    //get messages visible with that name and update the messages
    const getName = (user) => {
        if (!isAuthenticated){
            alert("Login required");
        } else {
            setMessages(getMessages(user));
        }


    }

    if (isAuthenticated){
        const domain = "dev-5und1roc.us.auth0.com";
    
        const accessToken = getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
        });
    
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    
        const metadataResponse = fetch(userDetailsByIdUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        
        //console.log(userDetailsByIdUrl);
        accessToken.then((x) => {console.log(x)});
        //console.log(metadataResponse);    

        //read:roles get roles of the user
    }


    return (
        <div className="App">
          <header className="App-header">
            <h1>Show secret messages with Auth0</h1>

            <p>
                Please click the buttons from left to right
            </p>

            <p>
                <Button onClick = {() => (!isAuthenticated) ? loginWithRedirect() : alert("Log Out first!") }>
                    Log In
                </Button>
                &nbsp;
                <Button onClick = {() => getName(user)}>
                    Show Messages
                </Button>
                &nbsp;
                <Button onClick = {() => (isAuthenticated) ? logout() : alert("Log In first!") }>
                    Log Out
                </Button>
            </p>

            <div>
                {((!isAuthenticated) ? "Not logged in" : "Welcome " + user.name)}
                { isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                )}

                {showSecret(secrets)}
            </div>


          </header>
        </div>
    );
}

export default App;
