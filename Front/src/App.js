import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

/**
 * [get messages]
 * @param  {[json]} token [user identity token returned by Auth0]
 * @return {[List]}       [List of secrets visible to {identity.name}}]
 */
async function getMessages(token){
    var messages = "hard coded messages";

    //express server listening on 8000
    await fetch("http://localhost:8000/api/getMessages", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
        async (res) => {
            if (res.status === 200 || res.status === 304) {
                //get messages from response body
                await res.json().then ((result) => { 
                    console.log(result.messages);
                    messages = (result.messages);
                    return messages;
                } );
            } else {
                //most likely token expired
                messages = ("Error in API CALL");
                return messages;
            }       
        }
    )
    return messages;
}

/**
 * [Show Secret] 
 * @param  {[String]} secrets [A list of messages visible to logged in user]
 * @return {[Html]}           [A html unordered list view of {secrets}]
 */
function showSecret(secrets){
    if (typeof secrets !== "string" || secrets === "")
        return(<p>No messages visible</p>);
    else {
        return (
            <ul>
                {secrets.split("|").map(secretMessage => (
                    <li>{secretMessage}</li>
                ))}
            </ul>
        );
    }
}

function App() {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [secrets, setMessages] = useState("");
    //get messages visible with that name and update the messages
    const getName = (user) => {
        if (!isAuthenticated){
            alert("Login required");
        } else {
            getAccessTokenSilently().then (
                async (usertoken) => {
                    var messages = await getMessages(usertoken);
                    setMessages(messages);
                });
        }
    }

    return (
        <div className="App">
          <header className="App-header">
            <div>
                <h1>Show secret messages with Auth0</h1>
                <p>
                    Please click the buttons from left to right
                </p>
            </div>
            
            <div>
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
            </div>

            <hr/>  

            <div>
                {((!isAuthenticated) ? "Not logged in" : "Welcome " + user.name)}
                { isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                )}

                <p>Messages visible</p>
                {showSecret(secrets)}
            </div>

          </header>
        </div>
    );
}

export default App;
