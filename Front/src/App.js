import './App.css';
import { Dropdown } from 'react-bootstrap';
import React from 'react';

import Axios from 'axios';

var secretMessages = [];
var errorInfo = "";

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @return {[type]}      [description]
 */
function getSecret(identity){
    secretMessages = [];
    errorInfo = "";

    console.log(identity);
    //client side checking
    //we assume all users of this application are truthful
    if (identity == null)  {
        errorInfo = "unknown user"
    }

    Axios.post("http://localhost:8000/getMessages", {"name": identity})
    .then (res => {
        secretMessages = res;
    }) 
    .catch (error => {
        errorInfo = error;
    })
}

/**
 * [someFunction description]
 * @return {[type]}      [description]
 */
function showSecret(){
    if (errorInfo !== "") {
        return(<p>{errorInfo}</p>);
    } else if (secretMessages.length === 0)
        return(<p>No messages visible</p>);
    else {
        return (
            <ul>
              {secretMessages.map(secretMessage => (
                <li>{secretMessage}</li>
              ))}
            </ul>
        );
    }

}

function App() {

    return (
        <div className="App">
          <header className="App-header">
            <p>
                Please select your name from the dropdown menu.

                <Dropdown onSelect={getSecret}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Please select name
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        <Dropdown.Item eventKey = "Alex">Alex</Dropdown.Item>
                        <Dropdown.Item eventKey = "Bob">Bob</Dropdown.Item>
                        <Dropdown.Item eventKey = "Matt">Matt</Dropdown.Item>
                        <Dropdown.Item eventKey = "Raymond">Raymond</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </p>

            <p>
                Messages you can see: 
            </p>
            <p>
                {showSecret()}
            </p>

          </header>
        </div>
    );
}

export default App;
