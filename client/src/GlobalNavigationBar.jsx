// ***** GlobalNavigationBar component *****

import { Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import HomeContainer from './HomeContainer';
import LogInForm from './LogInForm';
import { SignUpParties, TeacherSignUpForm, ParentSignUpForm } from './userSignUp';
import { TeacherProfileForm } from './userProfileForm';
import { PodList, TeacherList } from './searchResults';
import CreatePod from './CreatePod';
import { ContactTeacher, ContactPodOrganizer } from './contactForm';
import { PodDetailsContainer } from './podDetailsMain';
import TeacherDetails from './TeacherDetails';
import beanstalksquarelogo from './img/beanstalksquarelogo.png';
import { Form, Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function GlobalNavigationBar(props) {
  let location = useLocation();
  const [justLoggedOut, setJustLoggedOut] = React.useState(false);
  
  function LogOut(event) {
    localStorage.removeItem("user");
    alert("You are now logged out of your account.");
    props.setLoggedInStatus();
    setJustLoggedOut(true);
  }

  return (
    <div> 
      <Navbar bg="none" variant="light">
      <Navbar.Brand href="#home"><img src={beanstalksquarelogo} width="270px" height="40px" alt="beanstalksquarelogo"/></Navbar.Brand>
      <Nav className="navbar-nav ml-auto">
      <Form inline >
            {props.isLoggedIn==="True"? 
            [<Link key={1} to="/" onClick={LogOut} className="btn bg-transparent nav-links nav-item" variant="btn-secondary" > Log Out </Link>]
            : location.pathname==="/signup" || location.pathname==="/signup_parent" || location.pathname==="/signup_teacher" ? 
            [<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>] : 
            location.pathname==="/login" ? [<Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>] 
            :[<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>, 
            <Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>]} 
      </Form>
      </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/podlist" component={PodList}>
        </Route>  
        <Route path="/signup" component={SignUpParties}>
        </Route>  
        <Route path="/signup_parent">
          <ParentSignUpForm setLoggedInStatus={props.setLoggedInStatus}/>
        </Route>  
        <Route path="/signup_teacher"> 
          <TeacherSignUpForm setLoggedInStatus={props.setLoggedInStatus} />
        </Route> 
        <Route path="/profile_teacher">
          <TeacherProfileForm />
        </Route>
        <Route path="/dashboard">
          <HomeContainer />
        </Route>
        <Route path="/login">
          <LogInForm setLoggedInStatus={props.setLoggedInStatus} />
        </Route>
        <Route path="/logout">
          <LogOut />
        </Route>
        <Route path="/createpod">
        <CreatePod /> 
        </Route>
        <Route path ="/contactpodorganizer/:podId">
        <ContactPodOrganizer />
        </Route>
        <Route path ="/contactteacher/:teacherId">
        <ContactTeacher />
        </Route>
        <Route path="/podlist/:zipcode">
        <PodList isLoggedIn={props.isLoggedIn}/>
        </Route>
        <Route path="/teacherlist/:zipcode">
        <TeacherList isLoggedIn={props.isLoggedIn}/>
        </Route>
        <Route path="/poddetails/:podId">
        <PodDetailsContainer isLoggedIn={props.isLoggedIn}/> 
        </Route>
        <Route path="/teacherdetails/:teacherId">
        <TeacherDetails isLoggedIn={props.isLoggedIn}/> 
        </Route>
        <Route path="/">
          <HomeContainer />
        </Route>
      </Switch>
    </div>
    );
  }

export default GlobalNavigationBar;