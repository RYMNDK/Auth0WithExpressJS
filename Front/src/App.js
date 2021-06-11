import './App.css';
import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';

import axios from 'axios';

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @return {[type]}      [description]
 */
function getMessages(identity){

    return ["Hard coded messages for " + identity];
    //skip client side checking
    //we assume all users of this application are truthful
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
}

/**
 * [someFunction description]
 * @return {[type]}      [description]
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
    //set initial state
    const [secrets, setMessages] = useState([]);
    //get messages visible with that name and update the messages
    const getName = (name) => {
        setMessages(getMessages(name));
    }

    return (
        <div className="App">
          <header className="App-header">
            <p>
                Please select your name from the dropdown menu.

                <Dropdown onSelect={getName}>
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
                Messages visible: 
            </p>
            <p>
                {showSecret(secrets)}
            </p>

          </header>
        </div>
    );
}

export default App;
