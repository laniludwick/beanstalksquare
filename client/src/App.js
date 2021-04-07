import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalNavigationBar from './GlobalNavigationBar';
import { Spinner } from 'react-bootstrap';


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
    <React.Fragment>
    <div className="content">
      <Router>
        <div> 
          <Spinner color="info" />
          <GlobalNavigationBar setLoggedInStatus={setLoggedInStatus} 
                                isLoggedIn={isLoggedIn} 
                                setHasJustLoggedIn={setHasJustLoggedIn}
                                hasJustLoggedIn={hasJustLoggedIn}
                                />
        </div>
      </Router> 
    </div>
    <div className="footer"><br/>
      <p className="footer-padding">© 2020 Copyright: Beanstalk Square.<br/>All rights reserved.</p>
    </div>
  </React.Fragment>
  );
}

export default App;
