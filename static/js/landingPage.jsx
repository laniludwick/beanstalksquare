// ***** HomeContainer, GlobalNavigationBar, and Benefits components, used on the landing page *****

function HomeContainer() {

  const [linkStatus, setLinkStatus] = React.useState("find_students");
  const [originalStatus, setOriginalStatus] = React.useState("active-style;");
  const [oppositeStatus, setOppositeStatus] = React.useState("");

  const clickStudents = () => {
    setLinkStatus("find_students");
    setOriginalStatus("active-style");
    setOppositeStatus("");
  }
  const clickTeachers = () => {
    setLinkStatus("find_teachers");
    setOriginalStatus("");
    setOppositeStatus("active-style");
  }

  return (
    <div>
      <div className="hero">
        <map name="heromap">
          <area shape="rect" id="find-students" coords="10,140,150,250" onClick={clickStudents} alt="FindStudents" />
          <area shape="rect" id="find-teachers" coords="150,140,300,250" onClick={clickTeachers} alt="FindTeachers"  />
        </map>
      </div>
      <div className="upper-hero-text">
        Engage in distance learning together.
      </div>
      <div>
        <div className="hero-search-options">
          {linkStatus=="find_students"? 
          [<Link to="" key="0" name="find-students" className="filtered-search a-search active-style" onClick={clickStudents} id="find-students"> Find Students </Link>,
          <Link to="" key="1" name="find-teachers" className="filtered-search a-search" onClick={clickTeachers} id="find-teachers" > Find Teachers</Link>] : 
          [<Link to="" key="3" name="find-students" className="filtered-search a-search" onClick={clickStudents} id="find-students"> Find Students </Link>,
          <Link to="" key="4" name="find-teachers" className="filtered-search a-search active-style" onClick={clickTeachers} id="find-teachers" > Find Teachers</Link>]}
          <h5> </h5>
          {linkStatus=="find_students"? <PodSearch  /> : <TeacherSearch />}
        </div>
      </div>
      <div className="middle-left">
      </div>
      <br/>
      <div className="card-deck">
        <Benefits />
      </div>
    </div>
  )
}


function GlobalNavigationBar(props) {
  let location = ReactRouterDOM.useLocation();
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
      <Navbar.Brand href="#home"><img src="static/img/beanstalksquarelogo.png" width="270px" height="40px"/></Navbar.Brand>
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

function Benefits() {

  return (
    <div className="card-deck-exterior-padding">
      <Container fluid>
        <Row>
          <Col>
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>Contact Nearby Families</Card.Title>
                  <Card.Text>
                    Get in touch with other families to discuss joining a pod together.
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits1.jpg" />
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Limit Your Risk Exposure</Card.Title>
                  <Card.Text>
                    Stay safe by finding a small group of other children to study or play with.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits2.jpg" />
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Gain Social Interaction</Card.Title>
                  <Card.Text>
                    Social interaction is important for children to meet developmental milestones.
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits3.jpg" />
              </Card>
            </CardDeck>
          </Col>
        </Row>  
      </Container>
    </div>
  );
}
  
  