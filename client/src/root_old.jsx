const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

import React from 'react';
import { Button, Col, Container, CardDeck, Card, ListGroup, ListGroupItem, Form, FormControl, Navbar, Nav, Row, Table, Modal, Spinner, Alert } from 'react-bootstrap';


function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState("False");
  const [hasJustLoggedIn, setHasJustLoggedIn] = React.useState("False");
  const setLoggedInStatus = () => { 
    let loggedInStatus = localStorage.getItem('user')? "True" : "False";
    if (loggedInStatus !=null) {
      setIsLoggedIn(loggedInStatus);
    }
  }

  return (
    <div>
      <Router>
        <div> 
          <Spinner color="info" />
          <GlobalNavigationBar setLoggedInStatus={setLoggedInStatus} 
                                isLoggedIn={isLoggedIn} 
                                setHasJustLoggedIn={setHasJustLoggedIn}
                                hasJustLoggedIn={hasJustLoggedIn}
                                />
        </div>
      </Router><br/><br/>
      <div className="footer"><br/>
        <p className="footer-padding">© 2020 Copyright: Beanstalk Square.<br/>All rights reserved.</p>
      </div>
    </div>
  );
}


// ReactDOM.render(
//   <App />, document.querySelector('#root')
// );