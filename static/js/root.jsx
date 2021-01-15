const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

const { Button, Col, Container, CardDeck, Card, ListGroup, ListGroupItem, Form, FormControl, Navbar, Nav, Row, Table, Modal, Spinner, Alert } = ReactBootstrap;


const googleMapScript = document.createElement('script');    
googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyANBBOatlktyObD1SVk0ZzXGE9vFMZyloc&libraries=places`;
//In body tag of DOM, add script tags.
document.body.appendChild(googleMapScript);

//Call the function to create map and geocode after script tag has loaded.
googleMapScript.addEventListener('load', () => {    
  window.googlemapsdidload=true;
});

function GoogleMap(props) {
  console.log("props in Googlemap component:", props.podDetailsAll.props.street_address);
  //console.log("props in Googlemap component:", props.props.street_address)
  //console.log("props in map component:", props.props.podDetailsAll.street_address)
  const address = props.podDetailsAll.props.street_address + ", " + 
                  props.podDetailsAll.props.city + ", " + 
                  props.podDetailsAll.props.state + " " + 
                  props.podDetailsAll.props.zipcode;
  console.log("concatenated address:", address);
  //points to the mounted map element ref'd in the DOM. This spot holds the map.
  const googleMapRef = React.useRef(null); 
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  //Hook to load GoogleMaps script and the map itself upon render of component.
    //Load script tags.  
    if (window.googlemapsdidload) {  
      code_address(address);
    }
    else { 
      googleMapScript.addEventListener('load', () => {    
        code_address(address);
      });
    } 

  //Hook to create map
  React.useEffect (() => {  
    if (latitude !==0 && longitude !==0) {
    createGoogleMap();
    }
  },[latitude, longitude]);

  //Define function to convert address into geocode address
  function code_address(address) {
    const geocoder = new google.maps.Geocoder();
    //address = "142 Channing Rd, Burlingame, CA 94010";
    console.log("address post geocode constructor:", address);
    geocoder.geocode({'address':address}, function (results, status) {
      console.log("address and results post .geocode method:", address, results);

      if (status === google.maps.GeocoderStatus.OK) {
        const lat_data = results[0].geometry.location.lat();
        const lng_data = results[0].geometry.location.lng();
        console.log("lat_data, lng_data, status, results, address:", lat_data, lng_data, status, results, address);
        //alert("Geocode successful:", lat_data, lng_data, status);
        
        if (lat_data && lng_data) {
          setLatitude(lat_data);
          setLongitude(lng_data);
          console.log("just set latitude:", latitude);
          console.log("just set longitude:", longitude);
        }
      }
      else {
        alert("Geocode was not successful, here's the status:", status);
      } 
    }); 
  } 

  console.log("address right before createmap:", address);
  
  //Create/instantiate Google map
  function createGoogleMap(address) {
    console.log("address passed to createmap:", address);
    const map = new google.maps.Map(googleMapRef.current, {
      zoom:13,
      center: { lat: latitude,
                lng: longitude,},
      disableDefaultUI: true,
    }); 
    setMap(map);
    console.log("google map state in create map, latitude, longitude:", map, latitude, longitude);
    const position = new google.maps.LatLng(latitude, longitude);
    
    //Marker instantiation
    const marker = new google.maps.Marker({
      position: position,
      title: 'Pod location',
    }); 
    marker.setMap(map);
    console.log("marker:", marker);  
    console.log("map, lat, long:", map, latitude, longitude);  
    console.log("lat, long states:", latitude, longitude);
  } 

  return (
    <div id="google-map" ref={googleMapRef} style={{width: '715px', height: '510px'}}></div>
  );
}


function MapContainer(props) {
  console.log("props in Mapcontainer component:", props)
  
  return ( 
    <div className="map"><br/>
    <h3>Pod location(s) </h3>
      <p>{props.podDetailsAll.props.street_address}<br/>
        {props.podDetailsAll.props.city}, {props.podDetailsAll.props.state}, {props.podDetailsAll.props.zipcode}
      </p>
      <GoogleMap podDetailsAll={props.podDetailsAll} />    
    </div>
  )
}


function TeachersInPod(props) {

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td id="table-vertical-align-top">
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src={props.img_url} />
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                  <table className="text-alignment">
                    <tbody></tbody>
                  </table>
                  <p className="card-text"><b>Bio</b><br/>{props.bio}</p>
                  <p><b>Teaching Experience</b><br/>
                    {props.teaching_experience_in_hours} hrs</p>         
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>     
    </div>  
  );
}


function TeachersInPodList(props) {

  const [teachersInPod, setTeachersInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    console.log("Beg of useEffect in TeachersInPodList");
    fetch(`/api/teachersinpod/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      console.log("teachers in pod data response:", data);
      const teacherComponentsList = [];

      for (const teacher of data) {
        const full_name = teacher.fname +" "+ teacher.lname;
        console.log("teacher's full name:", full_name);
        const teacherElement = <TeachersInPod 
                                  key={teacher.teacher_id}
                                  name={full_name}
                                  bio={teacher.bio}
                                  img_url={teacher.img_url}
                                  teaching_experience_in_hours={teacher.teaching_experience_in_hours}
                                  pay_rate_per_hour={teacher.pay_rate_per_hour}
                                  />
        console.log("Teacher component:", teacherElement);
        teacherComponentsList.push(teacherElement);
        }
      setTeachersInPod(teacherComponentsList); 
    });
  }, [])
  console.log("Looking for teachers list:", teachersInPod);
  
  return ( 
    <div>
      <h3>Teacher</h3>
      {teachersInPod}
  </div>
  )
}


function Child(props) {

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src="/static/img/child.png"/>
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                  <table className="text-alignment">
                    <tbody>
                      <tr>
                        <th> Gender</th>
                        <th className="table-padding">Grade</th>
                        <th className="table-padding">School</th>
                        <th className="table-padding">Program</th>
                      </tr>
                      <tr>
                        <td >{props.gender}</td>
                        <td className="table-padding">{props.grade_name}</td>
                        <td className="table-padding">{props.school_name}</td>
                        <td className="table-padding">{props.school_program}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="card-text"></p>   
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


function ChildrenInPodList(props) {

  const [childrenInPod, setChildrenInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    console.log("Beg of useEffect in ChildrenInPodList");
    fetch(`/api/children/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      console.log("children in pod data response:", data);
      const childComponentsList = [];

      for (const child of data) {
        const full_name = child.fname+" "+child.lname;
        console.log("child's full name:", full_name);
        const childElement = <Child 
                                  key={child.child_id}
                                  full_name={full_name}
                                  gender={child.gender}
                                  zipcode={child.zipcode}
                                  grade_name={child.grade_name}
                                  school_program={child.school_program}
                                  school_name={child.school_name}
                                  />
        console.log("Child component:", childElement);
        childComponentsList.push(childElement);
      }
      setChildrenInPod(childComponentsList); 
    });
  }, [])
  console.log("Looking for children list:", childrenInPod);
  
  return ( 
    <div><br/>
    <h3 className="table-title">Students</h3><br/>
      {childrenInPod}<br/><br/>
    </div>
  )
}


function PodDetailsAll (props) {

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title id="pod-details-title">{props.pod_name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <table >
          <tbody>
          <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Maximum Child Capacity:</b>   {props.max_child_capacity}</td><td className="table-data-width-pod-details"><b>Same School Program:</b>   {props.same_school_program_only}</td></tr>
          </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Days:</b>   {props.days_per_week}/week</td><td className="table-data-width-pod-details"><b>Same Grade:</b>   {props.same_grade_only}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Hours:</b>   {props.total_hours_per_day} hrs/day</td><td className="table-data-width-pod-details"><b>Meets Outdoors Only:</b>   {props.outdoors_only}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Paid teacher:</b>   {props.paid_teacher}</td><td className="table-data-width-pod-details"><b>Periodic Covid Testing:</b>   {props.periodic_covid_testing}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Same School:</b>   {props.same_school_only}</td><td className="table-data-width-pod-details"><b>Cost:</b>   ${props.cost_per_hour}/hr</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}


function PodDetails(props) {

  const [podDetailsAll, setPodDetailsAll] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    console.log("Beg of getPodDetails");
    fetch(`/api/pods/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      console.log("data in pod details response:", data);
      const podComponentsList = [];

      for (const pod of data) {
        const podDetailsElement = <PodDetailsAll 
                                  key={pod.pod_id}
                                  pod_id={pod.pod_id}
                                  pod_name={pod.pod_name}
                                  street_address={pod.street_address}                                    
                                  city={pod.city} 
                                  state={pod.state}
                                  zipcode={pod.zipcode}
                                  max_child_capacity={pod.max_child_capacity}
                                  days_per_week={pod.days_per_week}
                                  total_hours_per_day={pod.total_hours_per_day}
                                  paid_teacher={pod.paid_teacher}
                                  same_school_only={pod.same_school_only}
                                  same_school_program_only={pod.same_school_program_only}
                                  same_grade_only={pod.same_grade_only}
                                  outdoors_only={pod.outdoors_only}
                                  periodic_covid_testing={pod.periodic_covid_testing}
                                  cost_per_hour={pod.cost_per_hour}
                                  />
        console.log("pod details component:", podDetailsElement);
        setPodDetailsAll(podDetailsElement);  
      }
    });
  }, [])
  console.log("Looking for pod details:", podDetailsAll)
  
  return ( 
    <div><br/>
    <h3 className="table-title"> Pod Details </h3><br/>
      {podDetailsAll} 
      <div width="50%"><br/>
        {podDetailsAll? <MapContainer podDetailsAll={podDetailsAll}/> : null}
      </div>
    </div>
  )
}


function PodDetailsContainer(props) {

  const {podId} = ReactRouterDOM.useParams();
  const contact_pod_organizers_link = `/contactpodorganizer/${podId}`

  return (
    <div>
      <div className="detail-results-table-wrapper">
        <div className="contact-button-position">
          <Link to={contact_pod_organizers_link} className="btn btn-primary">Contact Pod Organizer </Link> 
        </div>
        <div width="50%">
          <PodDetails /> 
        </div>
        <div width="50%"><br/><br/>
          <TeachersInPodList />
        </div>
        <div width="50%" className="bottom-padded"><br/>
          <ChildrenInPodList /><br/><br/>
        </div>
      </div>
    </div>    
  )
}


function Pod(props) {

  const podDetailsLink = `/poddetails/${props.pod_id}`;

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src="/static/img/planticon.png" className="search-list-img"/>
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                <h5 className="card-title">{props.pod_name}</h5>
                  <table className="text-alignment">
                    <tbody>
                      <tr>
                        <th> Zipcode</th>
                        <th className="table-padding">Days</th>
                        <th className="table-padding">Hours</th>
                        <th className="table-padding">Paid Teacher</th>
                      </tr>
                      <tr>
                        <td >{props.zipcode}</td>
                        <td className="table-padding">{props.days_per_week}/week</td>
                        <td className="table-padding">{props.total_hours_per_day} hrs/day</td>
                        <td className="table-padding">{props.paid_teacher}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="card-text"></p>
                    {props.isLoggedIn==="True"? <Link to={podDetailsLink} className="btn btn-primary" variant="primary"> View Details </Link>:<Link to="/login" className="btn btn-primary" variant="primary"> Login to View Details </Link>}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  //console.log("props in Global nav:******", props)
  let location = ReactRouterDOM.useLocation();
  //console.log("location pathname:", location.pathname);
  const [justLoggedOut, setJustLoggedOut] = React.useState(false);
  
  function LogOut(event) {
    //console.log("***************local storage user islogged in before removal:", localStorage);
    localStorage.removeItem("user");
    //console.log("***************local storage user islogged in after removal:", localStorage);
    alert("You are now logged out of your account.");
    props.setLoggedInStatus();
    setJustLoggedOut(true);
  }

  // function AlertLoggedOut() {

  //   const [show, setShow] = React.useState(true);
  //   if (show) {
      
  //     return (
  //     <Alert variant="success" onClose={() => setShow(false)} dismissible>>
  //       {/*<Alert.Heading>Hey, nice to see you</Alert.Heading>*/}
  //       <p>You are now logged out of your account.</p>
  //       {/*<hr />
  //       <p className="mb-0">
  //         Whenever you need to, be sure to use margin utilities to keep things nice
  //         and tidy.
  //       </p>*/}
  //     </Alert>
  //   );
  // }}

  return (
    <div> 
      <Navbar bg="none" variant="light">
      <Navbar.Brand href="#home"><img src="static/img/beanstalksquarelogo.png" width="270px" height="40px"/></Navbar.Brand>
      <Nav className="navbar-nav ml-auto">
      <Form inline >
        {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            {/*{props.isLoggedIn==="True"? 
            [<Link key={1} to="/" onClick={LogOut} className="btn bg-transparent nav-links nav-item" variant="btn-secondary" > Log Out </Link>]
            : [<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>, 
            <Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>]}
  */}
            {props.isLoggedIn==="True"? 
            [<Link key={1} to="/" onClick={LogOut} className="btn bg-transparent nav-links nav-item" variant="btn-secondary" > Log Out </Link>]
            : location.pathname==="/signup" || location.pathname==="/signup_parent" || location.pathname==="/signup_teacher" ? 
            [<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>] : 
            location.pathname==="/login" ? [<Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>] 
            :[<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>, 
            <Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>]} 
        {/*<Button variant="outline-primary">Search</Button> */}
      </Form>
      </Nav>
  {/*    <Nav className="navbar-nav ml-auto">
      <Nav.Link href="#deets" className="nav-item" >More deets</Nav.Link>
      </Nav>*/}
      </Navbar>
    {/*  {justLoggedOut?  <AlertLoggedOut/>: null}  */}
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


function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState("False");
  const [hasJustLoggedIn, setHasJustLoggedIn] = React.useState("False");
  const setLoggedInStatus = () => { 
    let loggedInStatus = localStorage.getItem('user')? "True" : "False";
    //console.log("***************local storage user loggedInStatus:", loggedInStatus);
    if (loggedInStatus !=null) {
      //console.log("*******setislogged in prior to setting it to loggedInStatus:", loggedInStatus)
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

ReactDOM.render(
  <App />, document.querySelector('#root')
);