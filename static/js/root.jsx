const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

//import Button from 'react-bootstrap/Button' OR;
//const { Badge, Button, Col, Container, Form, FormControl, ListGroup, Navbar, Row, Table } = ReactBootstrap;
//import 'bootstrap/dist/css/bootstrap.min.css';


function ContactPodOrganizer() {
  
  const {podId} = ReactRouterDOM.useParams();
  console.log("podID from use params {podId} and podId:", {podId}, podId);
  const history = ReactRouterDOM.useHistory();
  const [userInputSms, setUserInputSms] = React.useReducer(
    (state, newState) => ({...state, ...newState}),

    {
    name: "",
    phone: "",
    email: "",
    message: "",
    }
  );

  const handleChange = evt => {

    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInputSms({[name]: newValue});
  }

  const contactPodOrganizer = (e) => {
    
    e.preventDefault();
    console.log("This is inside the contactPodOrganizer arrow function!");
    
    const useremail = localStorage.getItem("useremail");

    const textData = {"name": userInputSms.name, 
                        "phone": userInputSms.phone,
                        "email": userInputSms.email,
                        "message": userInputSms.message,
                        }

                
    console.log("Text data from form:", textData);
    console.log("Stringified text data:", JSON.stringify(textData));

    fetch(`/api/send_stock_sms/${podId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You successfully sent a message to the pod organizer!")
      //setIsLoggedIn("True")
      history.push(`/poddetails/${podId}`);
    }); //Close .then


  }

  return ( 
   
    <div>
     
     <br/>
     <label>Your name </label>
     <br/>
     <input type="text" name="name" value={userInputSms.name} onChange={handleChange}/>
      <br/>

      <label> Phone number</label>
      <br/>
      <input type="text" value={userInputSms.phone} name="phone" onChange={handleChange} />
      <br/>

      <label> Email</label>
      <br/>
      <input type="text" value={userInputSms.email} name="email" onChange={handleChange} />
      <br/>

      <label> Message</label>
      <br/>
      <input type="textarea" value={userInputSms.message} name="message" onChange={handleChange} rows={5}/>
      <br/>

      <br/>
      <button onClick={contactPodOrganizer}> Send message </button>
    </div>

  );
}




function Child (props) {

  return (
    <tr>
      <td>{props.full_name}</td>
      <td>{props.zipcode}</td>
      <td>{props.grade_name}</td>
      <td>{props.school_program}</td>
      <td>{props.school_name}</td>
      
    </tr>
  );
}



function GoogleMap(props) {
               
  console.log("props in Googlemap component:", props.podDetailsAll.props.street_address)
  //console.log("props in Googlemap component:", props.props.street_address)
  //console.log("props in map component:", props.props.podDetailsAll.street_address)
  const address = props.podDetailsAll.props.street_address + ", " + 
                  props.podDetailsAll.props.city + ", " + 
                  props.podDetailsAll.props.state + " " + 
                  props.podDetailsAll.props.zipcode;

  console.log("concatenated address:", address)


  //points to the mounted map element ref'd in the DOM. This spot holds the map.
  const googleMapRef = React.useRef(null); 

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);


  //Hook to load GoogleMaps script and the map itself upon render of component.
  React.useEffect(() => {

    //Load script tags.  
    const googleMapScript = document.createElement('script');
    
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyANBBOatlktyObD1SVk0ZzXGE9vFMZyloc&libraries=places`;

    //In body tag of DOM, add script tags.
    document.body.appendChild(googleMapScript);

    //Call the function to create map and geocode after script tag has loaded.
    googleMapScript.addEventListener('load', () => {    
      
      code_address(address);
      
      
    }); //Close event listener
  }, [latitude, longitude]); //Close useEffect hook that calls the create map and geocode functions


  //Hook to create map
  React.useEffect (() => {
    
    if (latitude !==0 && longitude !==0) {
  
    createGoogleMap();
    //setMarker(createMarker(map));
    }
  },[latitude, longitude]);


  //Hook to create markers for GoogleMap if the map itself is available  
  React.useEffect (() => {
    
    if (map) {
  
    createMarker(map);
    //setMarker(createMarker(map));
    }
  },[map]);


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
    } //Close else
    }); //Close unnamed function and geocode function
  } //Close code_address function



  //Define function that creates/instantiates the map itself
  const createGoogleMap = () => {

    setMap(new google.maps.Map(googleMapRef.current, {

      zoom:11,
      center: { lat: latitude,
                lng: longitude,},
      disableDefaultUI: true,

    })) ; //Close Map instance
    console.log("google map state in create map, latitude, longitude:", map, latitude, longitude);
  }
  console.log("google map state after create map closes, latitude, longitude:", map, latitude, longitude);
  

  //Define function that adds markers to the map
  const createMarker = (map) => {

    new google.maps.Marker({
      position: { lat: latitude,
                  lng: longitude,},
      title: 'Pod location',
      map: map,
    });

    console.log("map, marker:", map, latitude, longitude);  
  }

  
  console.log("lat, long states:", latitude, longitude);
  //Render map
  return (
    
    <div id="google-map" ref={googleMapRef} style={{width: '400px', height: '300px'}}>
    </div>
    
    );
}



function MapContainer(props) {

  console.log("props in Mapcontainer component:", props)
  return ( 
    <div className="map">
    This is the map view of search results!
      <GoogleMap podDetailsAll={props.podDetailsAll} />    
    </div>
  )
}



function ChildrenInPodList(props) {

  const [childrenInPod, setChildrenInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    
      console.log("Beg of useEffect in ChildrenInPodList");
      fetch(`/api/children/${podId}`, {
        method: 'GET',
      }) //Close fetch

      .then(response => response.json())

      .then(data => { 
        //use parsed result
        console.log("children in pod data response:", data);
       
        const childComponentsList = [];

        for (const child of data) {

          const full_name = child.fname+" "+child.lname;
          
          console.log("child's full name:", full_name);

          const childElement = <Child 
                                    key={child.child_id}
                                    full_name={full_name}
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
  
        <table className="podchildren">
        <thead>
          <tr> 
            <th scope="col">Name</th>
            <th scope="col">Zipcode</th>
            <th scope="col">Grade name</th>
            <th scope="col">School program</th>
            <th scope="col">School name</th>
            
          </tr>
        </thead>
        <tbody>
        {childrenInPod}
        </tbody>
      </table> 
  
  )
}


function PodDetailsAll (props) {

  return (
    <tbody>
          <tr> 
            <th className="pod-table-title" scope="row">Pod name</th>
            <td>{props.pod_name}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Maximum Child Capacity</th>
            <td>{props.max_child_capacity}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Days per week</th>
            <td>{props.days_per_week}</td>
          </tr>
          
          <tr>
            <th className="pod-table-title" scope="row">Hours per day</th>
            <td>{props.total_hours_per_day}</td>
          </tr>
          
          <tr>
            <th className="pod-table-title" scope="row">Paid teacher</th>
            <td>{props.paid_teacher}</td>
          </tr>
          
          <tr>
            <th className="pod-table-title" scope="row">Same School</th>
            <td>{props.same_school_only}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Same School Program</th>
            <td>{props.same_school_program_only}</td>
          </tr>
          
          <tr>
            <th className="pod-table-title" scope="row">Same Grade</th>
            <td>{props.same_grade_only}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Meets Outdoors Only</th>
            <td>{props.outdoors_only}</td>
          </tr>
          
          <tr>  
            <th className="pod-table-title" scope="row">Periodic Covid Testing</th>
            <td>{props.periodic_covid_testing}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Cost Per Hour</th>
            <td>{props.cost_per_hour}</td>
          </tr>

          <tr>
            <th className="pod-table-title" scope="row">Location</th>
            <td>{props.street_address},
                <br/>
                {props.city}, {props.state}, {props.zipcode}</td>
          </tr>
  </tbody>  
  );
}


function PodDetails(props) {

  const [podDetailsAll, setPodDetailsAll] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    
      console.log("Beg of getPodDetails");
      fetch(`/api/pods/${podId}`, {
        method: 'GET',
      }) //Close fetch

      .then(response => response.json())

      .then(data => { 
        //use parsed result
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
  
      <div> 
        <table className="table">
          {podDetailsAll} 
        </table> 
  
        <div width="50%">
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
      <br/>
      <br/>
      
      <div>
        <Link to={contact_pod_organizers_link} className="btn btn-primary">Contact Pod Parent </Link> 
      </div>
      <br/>
      <div width="50%">
        <PodDetails /> 
      </div>
      
      <div width="50%">
        <br/>
        <br/>
        <ChildrenInPodList />
      </div>
        
    </div>
     
  )
}




function CreatePod() {
  
  const history = ReactRouterDOM.useHistory(); 

  const [userInputPod, setUserInputPod] = React.useReducer(
    (state, newState) => ({...state, ...newState}),

    {
    pod_name: "",
    max_child_capacity: "",
    days_per_week: "",
    total_hours_per_day: "",
    paid_teacher: "",
    same_school_only: "",
    same_school_program_only: "",
    same_grade_only: "",
    outdoors_only: "",
    periodic_covid_testing: "",
    cost_per_hour: "",
    
    }
  );

  

  const handleChange = evt => {
    const name = evt.target.name;

    const newValue = evt.target.type=="checkbox"? evt.target.checked : evt.target.value;
    setUserInputPod({[name]: newValue});
    console.log("name:", name);
    console.log("newValue:", newValue);
    console.log("userInputPod:", userInputPod);
  }


  const makePod = (e) => {
    
    e.preventDefault();
    console.log("This is inside the makePod arrow function!");
    
    const pod = {"pod_name": userInputPod.pod_name, 
                "max_child_capacity": userInputPod.max_child_capacity,
                "days_per_week": userInputPod.days_per_week,
                "total_hours_per_day": userInputPod.total_hours_per_day,
                "paid_teacher": userInputPod.paid_teacher,
                "same_grade_only": userInputPod.same_grade_only,
                "same_school_only": userInputPod.same_school_only,
                "same_school_program_only": userInputPod.same_school_program_only,
                "outdoors_only": userInputPod.outdoors_only,
                "periodic_covid_testing": userInputPod.periodic_covid_testing,
                "cost_per_hour": userInputPod.cost_per_hour}

                
    console.log("Pod data from form:", pod);
    console.log("Stringified pod:", JSON.stringify(pod));

    fetch('/api/createpod', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pod),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data response for create pod:", data);
      history.push('/')
    }); //Close .then


  }

  return (
    <div>
     <br/>
     <label>Pod Name </label>
     <br/>
     <input type="text" name="pod_name" value={userInputPod.pod_name} onChange={handleChange}/>
      <br/>

      
      <label> Maximum number of students </label>
      <br/>
      <input type="text" value={userInputPod.max_child_capacity} name="max_child_capacity" onChange={handleChange} />
      <br/>
    

      <label> Number of days per week</label>
      <br/>
      <input type="number" value={userInputPod.days_per_week} name="days_per_week" onChange={handleChange} />
      <br/>

      <label> Number of hours per day</label>
      <br/>
      <input type="number" value={userInputPod.total_hours_per_day} name="total_hours_per_day" onChange={handleChange} />
      <br/>

      <label> Paid teacher (rather than rotating parent volunteers)</label>
      <br/>
      <input type="checkbox" checked={userInputPod.paid_teacher} name="paid_teacher" onChange={handleChange} />
      <br/>

      <label> Students are in the same grade </label>
      <br/>
      <input type="checkbox" checked={userInputPod.same_grade_only} name="same_grade_only" onChange={handleChange} />
      <br/>

      <label> Students are in the same school </label>
      <br/>
      <input type="checkbox" checked={userInputPod.same_school_only} name="same_school_only" onChange={handleChange} />
      <br/>

      <label> Students are in the same school program </label>
      <br/>
      <input type="checkbox" checked={userInputPod.same_school_program_only} name="same_school_program_only" onChange={handleChange} />
      <br/>

      <label> Meets outdoors only</label>
      <br/>
      <input type="checkbox" checked={userInputPod.outdoors_only} name="outdoors_only" onChange={handleChange} />
      <br/>

      <label> Requests periodic tests for Covid</label>
      <br/>
      <input type="checkbox" checked={userInputPod.periodic_covid_testing} name="periodic_covid_testing" onChange={handleChange} />
      <br/>

      <label> Cost per hour</label>
      <br/>
      <input type="number" value={userInputPod.cost_per_hour} name="cost_per_hour" onChange={handleChange} />
      <br/>
      <br/>
      <button onClick={makePod}> Complete Pod Creation </button>
    </div>
     );

}





function Pod(props) {

  console.log("data in for isLoggedIn in Pod component:", props.isLoggedIn);
  const podDetailsLink = `/poddetails/${props.pod_id}`;

  return (
    <tr>
      <td>{props.pod_name}</td>
      <td>{props.zipcode}</td>
      <td>{props.days_per_week}</td>
      <td>{props.total_hours_per_day}</td>
      <td>{props.paid_teacher}</td>
      {/*<td><Link to={podDetailsLink}> View details</Link></td>*/}
     {props.isLoggedIn==="True"? <td><Link to={podDetailsLink}> View details</Link></td>: <td>View details</td>}
    </tr>
  );
}


function PodList(props) {
  
  //let location = ReactRouterDOM.useLocation();
  

  console.log("data in for isLoggedIn in PodList component:", props.isLoggedIn);
  const [podList, setPodList] = React.useState([]);
  const [dataResult, setDataResult] = React.useState([]);
  const {zipcode} = ReactRouterDOM.useParams();
  //let data = location.state.data
  //const data = props.data;


  React.useEffect(() => {
    
      fetch(`/api/pods?zipcode=${zipcode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      .then(response => response.json())

      .then(data => {
      
        console.log("data:", data);
        
        setDataResult(data);
        console.log("dataresult:", dataResult);
  
        }) //Close .then
  }, []); //Close useEffect



  React.useEffect(() => {

    //console.log("data in for loop in pod list:", data);
    const podComponentsList = [];

    for (let pod of dataResult) {
      
      console.log("pod:", pod);
      const podComponent = <Pod key={pod.pod_id}
                                pod_id={pod.pod_id}
                                pod_name={pod.pod_name}
                                zipcode={pod.zipcode}
                                days_per_week={pod.days_per_week}
                                total_hours_per_day={pod.total_hours_per_day}
                                paid_teacher={pod.paid_teacher}
                                isLoggedIn={props.isLoggedIn}
                                />
      console.log("pod component:", podComponent);
      podComponentsList.push(podComponent);
      console.log("pod components list:", podComponentsList);
      
  }; //Close for loop
  

  setPodList(podComponentsList);
  }, [dataResult]);

  return ( 
    <div>
      <br/>
      <br/>
      <table className="table">
        <thead>
          <tr> 
            <th scope="col">Pod name</th>
            <th scope="col">Zipcode</th>
            <th scope="col">Days per week</th>
            <th scope="col">Hours per day</th>
            <th scope="col">Paid teacher</th>
            <th scope="col">Details</th>
           {/* {props.isLoggedIn==="True"? <th scope="col">Details</th> : null}*/}
          </tr> 
              
        </thead>
        <tbody>
        {podList}
        </tbody>
      </table> 
    </div>
  );
      
  
} //Close the entire Pod list


function PodSearch(props) {

  const [zipcode, setZipcode] = React.useState("");
  const history = ReactRouterDOM.useHistory(); //Not needed
  

  function handleChange(event) {
    setZipcode(event.target.value);
  }

  function handleSubmit(event) {
    

    //alert (`We're looking in zipcode: `+ zipcode);
    event.preventDefault();
    //Want to redirect to route.

    history.push(`/podlist/${zipcode}`); 
  }

  return ( 
     <div>
       <form onSubmit={handleSubmit} >
       
        <br/> 
           <label>Find Students</label>
        <br/>
          <input type="text" value={zipcode} name="zipcode" onChange={handleChange} />
          <input type="submit" value="search" /> 
      </form>
    {/* {dataResult? <PodList data={dataResult}/> : null} */}
     
    
    </div>
    ); //Close return of HTML in PodSearch function.
  } //Close the entire PodSearch function.
    
    


function Benefits() {

  return (
    
  <div>
    <p>(BENEFITS SECTION)</p>
    <div className = "three-containers">
      <div className="row">
        
        <div className = "col-4"> 
          <div className="mx-auto mktg">
            <i className="fa fa-trophy"></i> 
            Limit Risk Exposure
          </div>

          <div>Stay safe by finding a small group of other children to study or play with.
          </div>
        </div>

        <div className="col-4"> 
          <div className="mx-auto mktg">
            <i className="fa fa-globe"></i>
            Maintain Social Interaction
          </div>
          
          <div>Social interaction is important for children to meet developmental milestones.

          </div>
        </div>


        <div className="col-4"> 
          <div className="mx-auto mktg">
            <i className="fa fa-certificate"></i>
            Contact Families Near You
          </div>  
          
          <div>Get in touch with other families to discuss joining a pod together.
          </div>
        
        </div>
      </div>
    </div>
  </div>
  );
}



function Homepage() {

  return (
    <div>
      <br/>
      <br/>
      <p> (LARGE PHOTO GOES HERE) </p>
      <p>Find a small group of children in your area for your child to engage in distance learning with.</p>  
      {/*<img src= />*/}
    </div>
  );
}




function HomeContainer() {

  return (
    <div>

      
      <div><Homepage />
      </div>
      
      <div>
        <PodSearch  /> 
      </div>
      
      <div>
      <br/>
      <br/>
        <Benefits />
      </div>
        <br/>
        <br/>
    </div>
  )
}



function SignUpForm() {
  
  const history = ReactRouterDOM.useHistory();
  const [userInputSignUp, setUserInputSignUp] = React.useReducer(
    (state, newState) => ({...state, ...newState}),

    {
    fname: "",
    lname: "",
    email: "",
    password: "",
    }
  );

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInputSignUp({[name]: newValue});
    
    console.log("name:", name);
    console.log("newValue:", newValue);
    console.log("userInputSignUp:", userInputSignUp);
  }

  const makeSignUp = (e) => {
    
    e.preventDefault();
    console.log("This is inside the makeSignUp arrow function!");
    
    const signUpData = {"fname": userInputSignUp.fname, 
                        "lname": userInputSignUp.lname,
                        "signupemail": userInputSignUp.signupemail,
                        "signuppassword": userInputSignUp.signuppassword,
                        }

                
    console.log("SignUp data from form:", signUpData);
    console.log("Stringified sign up data:", JSON.stringify(signUpData));

    fetch('/api/signup_parent', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You successfully signed up!")
      //setIsLoggedIn("True")
      history.push("/");
    }); //Close .then


  }

  return ( 
   
    <div>
     
     <br/>
     <label>First name </label>
     <br/>
     <input type="text" name="fname" value={userInputSignUp.fname} onChange={handleChange}/>
      <br/>

      <label> Last name</label>
      <br/>
      <input type="text" value={userInputSignUp.lname} name="lname" onChange={handleChange} />
      <br/>

      <label> Email</label>
      <br/>
      <input type="text" value={userInputSignUp.signupemail} name="signupemail" onChange={handleChange} />
      <br/>

      <label> Password</label>
      <br/>
      <input type="text" value={userInputSignUp.signuppassword} name="signuppassword" onChange={handleChange} />
      <br/>

      <br/>
      <button onClick={makeSignUp}> Complete Sign Up </button>
    </div>

  );
}


function LogInForm(props) {

  const [loginemail, setLoginEmail] = React.useState("");
  const [loginpassword, setLoginPassword] = React.useState("");
  const history = ReactRouterDOM.useHistory(); 

  function handleEmailChange(event) {
    setLoginEmail(event.target.value);
    
  }

  function handlePasswordChange(event) {
  
    setLoginPassword(event.target.value);
  }

  const attemptLogIn = (e) => {
    
    e.preventDefault();
    console.log("This is inside the attemptLogIn arrow function!");
    
    const logInData = {
                        "loginemail": loginemail,
                        "loginpassword": loginpassword,
                        }

                
    console.log("LogIn data from form:", logInData);
    console.log("Stringified sign up data:", JSON.stringify(logInData));

    fetch('/api/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", logInData["loginemail"]);
        console.log("***************set item useremail:", logInData["loginemail"]);
        console.log("***************get item useremail:", localStorage.getItem("useremail"));
        alert("You are now logged in!");
        console.log("***************props in loginform function post-response:", props);
        props.setLoggedInStatus("True");
        history.push("/dashboard");
      }
      else{
        alert("Incorrect email address or password. Please try again.")
      }

    }); //Close .then
  }
    
   

  return ( 
   <form onSubmit={attemptLogIn} >
    
    <br/>
    <label> 
      Email 
      <br/>
      <input type="text" value={loginemail} name="loginemail" onChange={handleEmailChange} />
    </label>

    <br/>
    <label> 
      Password
      <br/>
      <input type="text" value={loginpassword} name="loginpassword" onChange={handlePasswordChange} />
    </label>

    <br/>
    <br/>
    <input type="submit" value="Submit" /> 
  </form>
      );
      
  
} //Close the entire LogIn Function



function GlobalNavigationBar(props) {
  console.log("props in Global nav:******", props)
  
  function LogOut(event) {

    console.log("***************local storage user islogged in before removal:", localStorage);
    localStorage.removeItem("user");
    console.log("***************local storage user islogged in after removal:", localStorage);

    alert("You are now logged out of your account.");
    props.setLoggedInStatus();
    //history.push("/");

  }

  return (

    <div> 
      <nav bg="light" expand="lg">
        
        <Link to="/"> <img src="static/img/beanstalksquarelogo.png" width="200px" height="40px"/></Link>
        
        {props.isLoggedIn==="True"? 
          [<Link key={1} to="/createpod" className="btn btn-primary" > Start a pod </Link>,
          <Link key={2} to="/" onClick={LogOut} className="btn btn-primary" > Log Out </Link>]
          : [<Link key={1} to="/login" className="btn btn-primary" > Log In </Link>, 
          <Link key={2} to="/signup" className="btn btn-primary"> Sign Up </Link>]}

      </nav>

      <Switch>
              
        <Route exact path="/podlist" component={PodList}>
        </Route>  

        <Route path="/signup" component={SignUpForm}>
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

        <Route path="/podlist/:zipcode">
        <PodList isLoggedIn={props.isLoggedIn}/>
        </Route>

        <Route path="/poddetails/:podId">
        <PodDetailsContainer isLoggedIn={props.isLoggedIn}/> 
        </Route>


        <Route path="/">
          <HomeContainer />
        </Route>

      </Switch>

    </div>

    );
  }


  

function App() {
    
    //Use logic to determine if the user is logged in or not

  const [isLoggedIn, setIsLoggedIn] = React.useState("False");
  
  const setLoggedInStatus = () => { 

    let loggedInStatus = localStorage.getItem('user')? "True" : "False";

    console.log("***************local storage user loggedInStatus:", loggedInStatus);

    if (loggedInStatus !=null) {
      console.log("*******setislogged in prior to setting it to loggedInStatus:", loggedInStatus)
      setIsLoggedIn(loggedInStatus);
    }

  }

  
  return (
    <Router>
      <div> 
        
        <GlobalNavigationBar setLoggedInStatus={setLoggedInStatus} isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}


ReactDOM.render(
  <App />, document.querySelector('#root')
);