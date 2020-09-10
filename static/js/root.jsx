const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

//import Button from 'react-bootstrap/Button' OR;
const { Badge, Button, Col, Container, CardDeck, Card, Form, FormControl, FormFile, FormLabel, ListGroup, Navbar, Nav, Row, Table, Modal, Spinner, Alert} = ReactBootstrap;
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function ContactTeacher() {
  
  const {teacherId} = ReactRouterDOM.useParams();
  console.log("teacherID from use params {teacherId} and teacherId:", {teacherId}, teacherId);
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

  const contactTeacher = (e) => {
    
    e.preventDefault();
    console.log("This is inside the contactTeacher arrow function!");
    
    const useremail = localStorage.getItem("useremail");

    const textData = {"name": userInputSms.name, 
                        "phone": userInputSms.phone,
                        "email": userInputSms.email,
                        "message": userInputSms.message,
                        }

                
    console.log("Text data from contact teacher form:", textData);
    console.log("Stringified text data:", JSON.stringify(textData));

    fetch(`/api/send_stock_sms_teacher/${teacherId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You received a response from the server; please read it!")
      //setIsLoggedIn("True")
      history.push(`/teacherdetails/${teacherId}`);
    }); //Close .then


  }

  return ( 
   
    <div className="contact-form-wrapper">
     <h3>Send a message to the teacher</h3>
     <hr />
     <br/>
      <Form>
        <Form.Group controlId="formFirstName">
        
          <Form.Control type="text" placeholder="Your Name" value={userInputSms.name} name="name" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">

          <Form.Control type="text" placeholder="Phone Number" value={userInputSms.phone} name="phone" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formBasicEmail">

          <Form.Control type="email" placeholder="Email Address" value={userInputSms.email} name="email" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formMessage">

          {/*<Form.Control type="textarea" placeholder="Message" value={userInputSms.message} name="message" onChange={handleChange} rows={5}/> */}
          <textarea class="form-control" placeholder="Message" rows="3" value={userInputSms.message} name="message" onChange={handleChange}></textarea>
        </Form.Group>

        <Button variant="primary" onClick={contactTeacher} type="submit">Send message</Button> 
      </Form>
    </div>

  );
}



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

    fetch(`/api/send_stock_sms_pod/${podId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You received a response from the server; please read it!")
      //setIsLoggedIn("True")
      history.push(`/poddetails/${podId}`);
    }); //Close .then


  }

  return ( 
   
    <div className="contact-form-wrapper">
     <h3>Send a message to this pod's organizer(s)</h3>
     <hr />
     <br/>
      <Form>
        <Form.Group controlId="formFirstName">
        
          <Form.Control type="text" placeholder="Your Name" value={userInputSms.name} name="name" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">

          <Form.Control type="text" placeholder="Phone Number" value={userInputSms.phone} name="phone" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formBasicEmail">

          <Form.Control type="email" placeholder="Email Address" value={userInputSms.email} name="email" onChange={handleChange}/> 
        </Form.Group>

        <Form.Group controlId="formMessage">

          {/*<Form.Control type="textarea" placeholder="Message" value={userInputSms.message} name="message" onChange={handleChange} rows={5}/>*/} 
          <textarea class="form-control" placeholder="Message" rows="3" value={userInputSms.message} name="message" onChange={handleChange}></textarea>
        </Form.Group>

        <Button variant="primary" onClick={contactPodOrganizer} type="submit">Send message</Button> 
      </Form>
    </div>

  );
}




      

function TeacherDetails(props) {

  const [teacherDetailsAll, setTeacherDetailsAll] = React.useState({});
  const {teacherId} = ReactRouterDOM.useParams();
  const contact_teacher_link = `/contactteacher/${teacherId}`


  React.useEffect(() => {
    
      console.log("Beg of getTeacherDetails");
      fetch(`/api/teachers/${teacherId}`, {
        method: 'GET',
      }) //Close fetch

      .then(response => response.json())

      .then(data => { 
        //use parsed result
        console.log("data in teacher details response:", data);
       
        const full_name = data[0].fname+" "+data[0].lname;
        
        const teacherDetailsResults = {

          "teacher_id" : data[0].teacher_id,
          "teacher_name" : full_name,
          "bio" : data[0].bio,
          "email" : data[0].email,
          "mobile_number" : data[0].mobile_number,
          "zipcode" : data[0].zipcode,
          "pod_id" : data[0].pod_id,
          "img_url" : data[0].img_url,
          "days_of_week" : data[0].days_of_week,
          "teaching_experience_in_hours" : data[0].teaching_experience_in_hours,
          "pay_rate_per_hour" : data[0].pay_rate_per_hour,
        }
        
        setTeacherDetailsAll(teacherDetailsResults); 
        console.log("TeacherDetailsResults Dict:", teacherDetailsResults);
        
        // console.log("Teacher detail value:", teacherDetailsAll.teacher_id);
        // console.log("Teacher detail value:", teacherDetailsAll["teacher_id"]);
      }); // Close .then
      }, []) // Close useEffect

      console.log("Teacher details state:", teacherDetailsAll);
      
      
      // teacherDetailsAll.map(deet => {
      //   deet.teacher_id;

      // })
     
  return ( 
  
      <div className = "cta-button-right" width="80%"> 
        <br/>
        <br/>
        <Link to={contact_teacher_link} className="btn btn-primary btn-primary:hover">Contact Teacher </Link> 
        <br/>
        <br/>
        
        
        <table className="table table-corners" id="teacher-detail-results-table-wrapper">
          
          <thead>
          <tr > 
            <th className="table-header-row" scope="col"></th>
            <th className="table-header-row" scope="col">Name</th>
            <th className="table-header-row" scope="col">Bio</th>
            <th className="table-header-row" scope="col">Zipcode</th>
            <th className="table-header-row" scope="col">Availability</th>
            <th className="table-header-row" scope="col">Experience</th>
            <th className="table-header-row" scope="col">Pay rate</th>
          </tr>
          </thead>

          <tbody>
            <td><img src={teacherDetailsAll.img_url}/></td>
            <td>{teacherDetailsAll.teacher_name}</td>
            <td>{teacherDetailsAll.bio}</td>
            <td>{teacherDetailsAll.zipcode}</td>
            <td>{teacherDetailsAll.days_of_week}</td>
            <td>{teacherDetailsAll.teaching_experience_in_hours} hrs</td>
            <td>${teacherDetailsAll.pay_rate_per_hour}/hr</td>

          </tbody>  
        </table> 
      </div>
  )
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

      zoom:13,
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
    
    <div id="google-map" ref={googleMapRef} style={{width: '700px', height: '500px'}}>
    </div>
    
    );
}



function MapContainer(props) {

  console.log("props in Mapcontainer component:", props)
  return ( 
    <div className="map">
    <br/>
    <h3>Pod location(s) </h3>
      <GoogleMap podDetailsAll={props.podDetailsAll} />    
    </div>
  )
}



function TeachersInPod (props) {

  return (
    <tr>
      
      <td><img src={props.img}/></td>
      <td>{props.bio}</td>
      <td>{props.teaching_experience_in_hours} hrs</td>
      <td>${props.pay_rate_per_hour}/hr</td>
      
    </tr>
  );
}



function TeachersInPodList(props) {

  const [teachersInPod, setTeachersInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    
      console.log("Beg of useEffect in TeachersInPodList");
      fetch(`/api/teachersinpod/${podId}`, {
        method: 'GET',
      }) //Close fetch

      .then(response => response.json())

      .then(data => { 
        //use parsed result
        console.log("teachers in pod data response:", data);
       
        const teacherComponentsList = [];

        for (const teacher of data) {

          const full_name = teacher.fname +" "+ teacher.lname;
          
          console.log("teacher's full name:", full_name);

          const teacherElement = <TeachersInPod 
                                    key={teacher.teacher_id}
                                    bio={teacher.bio}
                                    img={teacher.img_url}
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
      
      <h3>Teacher(s) </h3>

        <table className="podteachers table table-corners">
        <thead>
          <tr > 
          
            <th className="table-header-row" scope="col">Photo</th>

            <th className="table-header-row" scope="col">Bio</th>
            <th className="table-header-row" scope="col">Teaching experience</th>
            <th className="table-header-row" scope="col">Pay rate</th>
            
          </tr>
        </thead>
        <tbody>
        {teachersInPod}
        </tbody>
      </table> 
  </div>
  )
}



function Child (props) {

  return (
    <tr>
      <td>{props.full_name}</td>
      <td>{props.gender}</td>
      <td>{props.zipcode}</td>
      <td>{props.grade_name}</td>
      <td>{props.school_name}</td>
      <td>{props.school_program}</td>
      
    </tr>
  );
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
    <div>
      <br/>
      <h3 className="table-title">Children</h3>
      <br/>
        <table className="table table-corners">
        <thead>
          <tr> 
            <th className="table-header-row" scope="col">Name</th>
            <th className="table-header-row" scope="col">Gender</th>
            <th className="table-header-row" scope="col">Zipcode</th>
            <th className="table-header-row" scope="col">Grade</th>
            <th className="table-header-row" scope="col">School</th>
            <th className="table-header-row" scope="col">Program</th>
            
            
          </tr>
        </thead>
        <tbody>
        {childrenInPod}
        </tbody>
      </table> 
      <br/>
      <br/>
    </div>
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
      <br/>
      <h3 className="table-title"> Pod Details </h3>
      <br/>
      
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
    <div className="detail-results-table-wrapper">
      <br/>
      <br/>
      <br/>
      <div className="contact-button-position">
        <Link to={contact_pod_organizers_link} className="btn btn-primary">Contact Pod Organizer </Link> 
      </div>
      <br/>
      <div width="50%">
        <PodDetails /> 
      </div>
      
      <div width="50%">
        <br/>
        <br/>
        <TeachersInPodList />
      </div>

       <div width="50%" className="bottom-padded">
        <br/>
        <ChildrenInPodList />
        <br/>
        <br/>
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
    paid_teacher: false,
    same_school_only: false,
    same_school_program_only: false,
    same_grade_only: false,
    outdoors_only: false,
    periodic_covid_testing: false,
    cost_per_hour: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
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
                "cost_per_hour": userInputPod.cost_per_hour,
                "street_address": userInputPod.street_address,
                "city": userInputPod.city,
                "state": userInputPod.state,
                "zipcode": userInputPod.zipcode,}
                
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
    
    <div className="create-pod-form-wrapper">
     <br/>
     <h3>Add a new pod to Beanstalk Square!</h3>
     <hr />
     <br/>
    <Form>
      <Form.Group controlId="formPodName">
        <Form.Control type="text" placeholder="Pod name" value={userInputPod.pod_name} name="pod_name" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formMaxNumberOfStudents">
        <Form.Control type="text" placeholder="Maximum number of students" value={userInputPod.max_child_capacity} name="max_child_capacity" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formNumberOfDaysPerWeek">
        <Form.Control type="number" placeholder="Number of Days per Week" value={userInputPod.days_per_week} name="days_per_week" onChange={handleChange}/> 
      
      </Form.Group>

      <Form.Group controlId="formNumberOfHoursPerDay">
        <Form.Control type="text" placeholder="Number of Hours per Day" value={userInputPod.total_hours_per_day} name="total_hours_per_day" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formCostPerHour">
        <Form.Control type="number" placeholder="Cost per Hour per Child" value={userInputPod.cost_per_hour} name="cost_per_hour" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formPaidTeacher">
      <Form.Check type="checkbox" label="Paid Teacher" checked={userInputPod.paid_teacher} name="paid_teacher" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formStudentsInTheSameGrade">
        <Form.Check type="checkbox" label="Students in the Same Grade" checked={userInputPod.same_grade_only} name="same_grade_only" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formStudentsInTheSameSchool">
        <Form.Check type="checkbox" label="Students in the Same School" checked={userInputPod.same_school_only} name="same_school_only" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formStudentsInTheSameSchoolProgram">
        <Form.Check type="checkbox" label="Students in the Same School Program" checked={userInputPod.same_school_program_only} name="same_school_program_only" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formOutdoorsOnly">
        <Form.Check type="checkbox" label="Meets Outdoors Only" checked={userInputPod.outdoors_only} name="outdoors_only" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group id="formPeriodicTestsForCovid">
        <Form.Check type="checkbox" label="Requests Child to Obtain a Periodic Covid Test" checked={userInputPod.periodic_covid_testing} name="periodic_covid_testing" onChange={handleChange}/> 
      </Form.Group>

      <br/>
      
      <Form.Label>Pod Location</Form.Label>
      <Form.Group controlId="formStreetAddress">
        <Form.Control type="text" placeholder="Street Address" value={userInputPod.street_address} name="street_address" onChange={handleChange}/> 
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formCity">
            <Form.Control type="text" placeholder="City" value={userInputPod.city} name="city" onChange={handleChange}/> 
          </Form.Group>

          <Form.Group as={Col} controlId="formState">
            <Form.Control type="text" placeholder="State" value={userInputPod.state} name="state" onChange={handleChange}/> 
          </Form.Group>

          <Form.Group as={Col} controlId="formZipcode">
            <Form.Control type="text" placeholder="Zipcode" value={userInputPod.zipcode} name="state" onChange={handleChange}/> 
          </Form.Group>
      </Form.Row>
      <br/>

      <Button variant="primary" onClick={makePod} type="submit">Create Pod</Button> 
      
      <br/>
      <br/>
    
    </Form>
      
      <br/>
      <br/>
      <br/>
      <br/>
  </div>


    // <div>
    //  <br/>
     
    //  <label>Pod Name </label>
    //  <br/>
    //  <input type="text" name="pod_name" value={userInputPod.pod_name} onChange={handleChange}/>
    //   <br/>

    //   <label> Maximum number of students </label>
    //   <br/>
    //   <input type="text" value={userInputPod.max_child_capacity} name="max_child_capacity" onChange={handleChange} />
    //   <br/>
    
    //   <label> Number of days per week</label>
    //   <br/>
    //   <input type="number" value={userInputPod.days_per_week} name="days_per_week" onChange={handleChange} />
    //   <br/>

    //   <label> Number of hours per day</label>
    //   <br/>
    //   <input type="number" value={userInputPod.total_hours_per_day} name="total_hours_per_day" onChange={handleChange} />
    //   <br/>

    //   <label> Paid teacher (rather than rotating parent volunteers)</label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.paid_teacher} name="paid_teacher" onChange={handleChange} />
    //   <br/>

    //   <label> Students are in the same grade </label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.same_grade_only} name="same_grade_only" onChange={handleChange} />
    //   <br/>

    //   <label> Students are in the same school </label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.same_school_only} name="same_school_only" onChange={handleChange} />
    //   <br/>

    //   <label> Students are in the same school program </label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.same_school_program_only} name="same_school_program_only" onChange={handleChange} />
    //   <br/>

    //   <label> Meets outdoors only</label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.outdoors_only} name="outdoors_only" onChange={handleChange} />
    //   <br/>

    //   <label> Requests periodic tests for Covid</label>
    //   <br/>
    //   <input type="checkbox" checked={userInputPod.periodic_covid_testing} name="periodic_covid_testing" onChange={handleChange} />
    //   <br/>

    //   <label> Cost per hour</label>
    //   <br/>
    //   <input type="number" value={userInputPod.cost_per_hour} name="cost_per_hour" onChange={handleChange} />
    //   <br/>
    //   <br/>

    //   <label> Pod meeting location:</label><br/>
    //   <label> Street address</label>
    //   <input type="text" value={userInputPod.street_address} name="street_address" onChange={handleChange} />
    //   <br/>
    //   <label> City</label>
    //   <input type="text" value={userInputPod.city} name="city" onChange={handleChange} />
    //   <label> State</label>
    //   <input type="text" value={userInputPod.state} name="state" onChange={handleChange} />
    //   <label> Zipcode</label>
    //   <input type="text" value={userInputPod.zipcode} name="zipcode" onChange={handleChange} />
    //   <br/>
    //   <br/>

    //   <label> Please read the following Covid risk profiles and select the profile that most closely represents your household.</label>
    //   <br/>
      
    //   <label>
    //     "Very strict": "Stays within home; Maintains 6’ distance; No one outside contact; Strict infection control protocol; No contact with outside world"
    //   </label><br/>
    //   <label>  
    //     "Strict": "Leaves home for essentials; Maintains 6’ of distance outside of home when leaves for essentials; Strict etiquette including hand washing, masks and social distancing are used 100% of the time when outside of the home; No socializing outside of the home"
    //   </label><br/>
    //   <label>
    //     "Fairly strict": "Leaves home only to go to work and for essentials; Fairly strict etiquette including hand washing, masks and social distancing are used 80-99% of the time when outside of the home; Occasionally socializes with others who are not in one’s home, but stay outdoors and maintain social distance of 6’ or less than 6’ only with masks"
    //   </label><br/>
    //     "Somewhat open": "Leaves home to exercise, go to the store, work,and other activities several times per week; Etiquette including hand washing, masks and social distancing are used 60-79% of the time when outside of the home; Sometimes socializes with others who are not in one’s home at less than a 6 foot distance if they have been following fairly strict or somewhat open protocols as well"
    //   <label>
    //     "Moderately open": "Leaves home to exercise, go to the store, work,and other activities multiple times per week; Etiquette including hand washing, masks and social distancing are used 20-59% of the time when outside of the home; May not maintain social distance and may see more than 10 people at a time"
    //   </label><br/>
    //     <label>
    //     "Very open": "No precautions to protect oneself from infection; Actively socializes without regard to social distancing or recommended etiquette"
    //     </label>
    //     <br/>
    //     Covid Risk Profile 
    //   <select value={userInputPod.covid_risk_profile} onChange={handleChange}>
    //     <option >Very strict </option>
    //     <option >Strict </option>
    //     <option >Fairly strict </option>
    //     <option >Somewhat open </option>
    //     <option >Moderately open </option>
    //     <option >Fairly open </option>
    //   </select>
    //   <br/>
    //   <br/>
    //   <button onClick={makePod}> Complete Pod Creation </button>
    // </div>
     );
}



// function Teacher1(props) {

//   console.log("data in for isLoggedIn in Teacher component:", props.isLoggedIn);
//   const teacherDetailsLink = `/teacherdetails/${props.teacher_id}`;

//   return (
//     <tr className="table-vertical-align">
//       <td><img src={props.img_url}/></td>
//       <td className="table-vertical-align">{props.teacher_name}</td>
//       <td className="table-vertical-align">{props.zipcode}</td>
//       <td className="table-vertical-align">{props.days_of_week}</td>
//       <td className="table-vertical-align">{props.teaching_experience_in_hours} hrs</td>
//       <td className="table-vertical-align">${props.pay_rate_per_hour}/hr</td>
//       {/*<td><Link to={podDetailsLink}> View details</Link></td>*/}
//      {props.isLoggedIn==="True"? <td className="table-vertical-align"><Link to={teacherDetailsLink}> View</Link></td >: <td className="table-vertical-align">View</td>}
//     </tr>
//   );
// }

function Teacher(props) {

  const teacherDetailsLink = `/teacherdetails/${props.teacher_id}`;

  return (
     
        <div className="card mx-auto w-75 card-width">
            <table>
            <tbody>
            <tr>
              <td>
                <div className="row no-gutters">
                    <div className="col-sm-3 card-image-position" >
                        <img src={props.img_url}/>
                    </div>
                </div>

              </td>

              <td>    
                <div className="col-sm-11">
                    <div className="card-body">
                        <h5 className="card-title">{props.teacher_name}</h5>
            

                        <table className="text-alignment">
                        <tbody>
                        <tr>

                        <th> Zipcode</th>
              
                        <th className="table-padding">Availability</th>
                     
                        <th className="table-padding">Teaching Experience</th>
                  
                        <th className="table-padding">Pay Rate</th>
                        
                        </tr>
                        
                        <tr>
             
                        <td >{props.zipcode}</td>
               
                        <td className="table-padding">{props.days_of_week}</td>
                 
                        <td className="table-padding">{props.teaching_experience_in_hours} hrs</td>
              
                        <td className="table-padding">${props.pay_rate_per_hour}/hr</td>
                        </tr>
                        
                        </tbody>
                        </table>

                        <p className="card-text"></p>
                        {props.isLoggedIn==="True"? <Link to={teacherDetailsLink} className="btn btn-primary" variant="primary"> View Profile </Link>:<Link to="/login" className="btn btn-primary" variant="primary"> Login to View Profile </Link>}
                    </div>
                </div>
            </td>
            </tr>
            </tbody>
            </table>
         
        </div>
    
  );
}

// function Pod1(props) {

//   console.log("data in for isLoggedIn in Pod component:", props.isLoggedIn);
//   const podDetailsLink = `/poddetails/${props.pod_id}`;

//   return (
//     <tr className="table-vertical-align">   
//       <td className="table-vertical-align">{props.pod_name}</td>
//       <td className="table-vertical-align">{props.zipcode}</td>
//       <td className="table-vertical-align">{props.days_per_week} days/wk</td>
//       <td className="table-vertical-align">{props.total_hours_per_day} hrs/day</td>
//       <td className="table-vertical-align">{props.paid_teacher}</td>
//       {/*<td><Link to={podDetailsLink}> View details</Link></td>*/}
//      {props.isLoggedIn==="True"? <td className="table-vertical-align"><Link to={podDetailsLink}> View</Link></td>: <td className="table-vertical-align">View</td>}
//     </tr>
//   );
// }


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
                        <img src="/static/img/planticon.png"/>
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





function TeacherList(props) {
  
  //let location = ReactRouterDOM.useLocation();
  console.log("data in for isLoggedIn in TeacherList component:", props.isLoggedIn);
  const [teacherList, setTeacherList] = React.useState([]);
  const [dataResult, setDataResult] = React.useState([]);
  const {zipcode} = ReactRouterDOM.useParams();
  //let data = location.state.data
  //const data = props.data;

  React.useEffect(() => {
    
      fetch(`/api/teachers?zipcode=${zipcode}`, {
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
    const teacherComponentsList = [];

    for (let teacher of dataResult) {
      
      const full_name = teacher.fname+" "+teacher.lname;

      if (teacher.pod_id == undefined) {
        console.log("teacher:", teacher);
        const teacherComponent = <Teacher key={teacher.teacher_id}
                                  teacher_id={teacher.teacher_id}
                                  bio={teacher.bio}
                                  email={teacher.email}
                                  mobile_number={teacher.mobile_number}
                                  teacher_name={full_name}
                                  zipcode={teacher.zipcode}
                                  pod_id={teacher.pod_id}
                                  img_url={teacher.img_url}
                                  days_of_week={teacher.days_of_week}
                                  teaching_experience_in_hours={teacher.teaching_experience_in_hours}
                                  pay_rate_per_hour={teacher.pay_rate_per_hour}
                                  isLoggedIn={props.isLoggedIn}
                                  />
        console.log("teacher component:", teacherComponent);
        teacherComponentsList.push(teacherComponent);
        console.log("teacher components list:", teacherComponentsList);
        }
  }; //Close for loop
  
  setTeacherList(teacherComponentsList);
  }, [dataResult]);

  return ( 
    <div>
      <div>
        <br/>
        <h3 className="mx-auto" id="teacher-list-title-row">{zipcode} Search Results</h3> 
        <br/>
      </div> 
     <div>
      {/*<div className="table-corners search-results-table-wrapper"> */}
{/*        <table className="table">
          <thead>
            <tr> 
              <th scope="col" className="table-header-row">Teacher</th>
              <th scope="col" className="table-header-row">Name</th>
              <th scope="col" className="table-header-row">Zipcode</th>
              <th scope="col" className="table-header-row">Availability</th>
              <th scope="col" className="table-header-row">Teaching Experience</th>
              <th scope="col" className="table-header-row">Pay Rate</th>
              <th scope="col" className="table-header-row">Details</th>
             {/* {props.isLoggedIn==="True"? <th scope="col">Details</th> : null}*/}
      {/*    </tr>     
          </thead>
          <tbody>*/}
          {teacherList}
         {/*} </tbody>
        </table> */}
      </div>
    </div>
  );
} //Close the entire Pod list



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
  
    <div className="mx-auto" id="pod-list-title-row">
    <br/>
      {/*<div className="d-flex justify-content-between">    */}
      {/*<div className="mx-auto w-75">*/}

          <span className="float-left"> 
           <h3>{zipcode} Search Results</h3> 
           <br/>
          </span>
         
         <span className="float-right">
          {props.isLoggedIn==="True"? <Link key={1} to="/createpod" className="btn btn-primary" variant="btn-primary" > Start a pod </Link>: null}
         </span>
         <br/>
      
      
      <br/>

      <div>
      {/*<div className="search-results-table-wrapper-75">
        <table className="table table-corners">
          <thead>
            <tr> 
              <th scope="col" className="table-header-row">Pod name</th>
              <th scope="col" className="table-header-row">Zipcode</th>
              <th scope="col" className="table-header-row">Days</th>
              <th scope="col" className="table-header-row">Hours</th>
              <th scope="col" className="table-header-row">Paid teacher</th>
              <th scope="col" className="table-header-row">Details</th>
             {/* {props.isLoggedIn==="True"? <th scope="col">Details</th> : null}*/}
            {/*</tr> 
                */}
          {/*</thead>
          <tbody>*/}
          {podList}
          {/*</tbody>
        </table> */}
      </div>
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
     <Form inline onSubmit={handleSubmit} >
       <Form.Group>
        <Form.Control type="text" value={zipcode} name="zipcode" onChange={handleChange} placeholder="Enter Zipcode" className="mr-sm-2 search-bar-width" />
        <Button variant="secondary" id="zipcode-search-box" type="submit" value="search" >Search</Button>
        </Form.Group>
      </Form>
    </div>
    ); //Close return of HTML in PodSearch function.
  } //Close the entire PodSearch function.
    



function TeacherSearch(props) {

  const [zipcode, setZipcode] = React.useState("");
  const history = ReactRouterDOM.useHistory(); //Not needed

  function handleChange(event) {
    setZipcode(event.target.value);
  }

  function handleSubmit(event) {
    //alert (`We're looking in zipcode: `+ zipcode);
    event.preventDefault();
    //Want to redirect to route.
    history.push(`/teacherlist/${zipcode}`); 
  }

  return ( 
     <div>
     <Form inline onSubmit={handleSubmit} >
       <Form.Group>
        <Form.Control type="text" value={zipcode} name="zipcode" onChange={handleChange} placeholder="Enter Zipcode" className="mr-sm-2 search-bar-width" />
        <Button variant="secondary" type="submit" value="search" >Search</Button>
        </Form.Group>
      </Form>
    </div>
    ); //Close return of HTML in PodSearch function.
  } //Close the entire PodSearch function.
    


function Benefits() {

  return (
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
              {/*<Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>*/}
            </Card>
            
            <Card>
              <Card.Body>
                <Card.Title>Limit Your Risk Exposure</Card.Title>
                <Card.Text>
                  Stay safe by finding a small group of other children to study or play with.{' '}
                </Card.Text>
              </Card.Body>
               <Card.Img variant="bottom" src="/static/img/benefits2.jpg" />
              {/*<Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>*/}
            </Card>
            <Card>
          
              <Card.Body>
                <Card.Title>Gain Social Interaction</Card.Title>
                <Card.Text>
                  Social interaction is important for children to meet developmental milestones.
                </Card.Text>
              </Card.Body>
              <Card.Img variant="bottom" src="/static/img/benefits3.jpg" />
              {/*<Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>*/}
            </Card>
          </CardDeck>
        </Col>
      </Row>  


    </Container>
  );
}




function HomeContainer() {

  const [linkStatus, setLinkStatus] = React.useState("find_students");

  const [originalStatus, setOriginalStatus] = React.useState("active-style;");
  const [oppositeStatus, setOppositeStatus] = React.useState("");
  
  console.log("originalStatus, oppositeStatus before render in HomeContainer:", originalStatus, oppositeStatus);


  const clickStudents = () => {

    // alert("clickStudents");
    setLinkStatus("find_students");
    setOriginalStatus("active-style");
    setOppositeStatus("");
    console.log("originalStatus, oppositeStatus, linkStatus after clickstudents:", originalStatus, oppositeStatus, linkStatus);
  }

  const clickTeachers = () => {

    // alert("clickTeachers");
    setLinkStatus("find_teachers");
    setOriginalStatus("");
    setOppositeStatus("active-style");
    console.log("originalStatus oppositeStatus, linkStatus after clickteachers:", originalStatus, oppositeStatus, linkStatus);
  }



  return (
    <div>

      <div className="hero">
        {/*<img src="/static/img/beanstalkhero2.jpg" width="100%" useMap="#heromap"/>*/}
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
        <br/>
    
        <br/>
      </div>
      
      <br/>
      <br/>
    
    </div>
  )
}


function TeacherProfilePic() {
  
  const history = ReactRouterDOM.useHistory();

  const [selectedFile, setSelectedFile] = React.useState(null); 
  const user_email = localStorage.getItem("user_email");

  const handleFileChange = evt => {

    const file = evt.target.files[0];
    
    setSelectedFile(file);
    console.log("selectedFile, file in handlefilechange:", selectedFile, file);
    }

  const handleFileUpload = (evt) => {
    
    evt.preventDefault();
    console.log("This is inside the handleFileUpload arrow function!");
    
    const formData = new FormData();
    console.log("Form data:", formData);
    console.log("selectedFile:", selectedFile)
    console.log("selectedFile:", {"hi": selectedFile});
    formData.append('file', selectedFile);
    formData.append('email', user_email);
    
    //console.log("Stringified selected File data:", JSON.stringify(formData));

    fetch('/api/profile_pic_teacher', {
      method: 'POST', 
      body: formData,
      
    })//Close fetch
       
    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You received a response, but need to read it.")
    }); //Close .then
    // .catch(err => 
    //   console.log("Error caught:", err)
    // ); //Close catch  

    //history.push("/");
    
  } //Close handleFileUpload function

  
  return ( 
   
 
    <Form>
      <Form.Group>
        <br/>
        <Form.File id="opener" label="Your Profile Photo" name="profile-pic" onChange={handleFileChange} />
        <br/>
        <Button variant="primary" onClick={handleFileUpload} type="submit">Upload Photo</Button> 
        <br/>
      </Form.Group>
    </Form>

  );
}





function TeacherProfileForm() {
  
  const history = ReactRouterDOM.useHistory();
  
  const user_email = localStorage.getItem("user_email");

  const [userInputProfile, setUserInputProfile] = React.useReducer(
    (state, newState) => ({...state, ...newState}),

    { 
    bio: "",
    zipcode: "",
    days_of_week: "",
    teaching_experience_in_hours: "",
    pay_rate_per_hour: "",
    
    //covid_risk_profile: "",
    }
  );

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInputProfile({[name]: newValue});
    
    console.log("name:", name);
    console.log("newValue:", newValue);
    console.log("userInputProfile:", userInputProfile);
  }

  const makeProfile = (e) => {
    
    e.preventDefault();
    console.log("This is inside the makeProfile arrow function!");
    
    const profileData = {
                        "bio": userInputProfile.teacher_bio,
                        "zipcode": userInputProfile.zipcode,
                        "days_of_week": userInputProfile.days_of_week,
                        "teaching_experience_in_hours": userInputProfile.teaching_experience_in_hours,
                        "pay_rate_per_hour": userInputProfile.pay_rate_per_hour,
                        "user_email": user_email,
                        }
    
    console.log("profile data from form:", profileData);
    console.log("Stringified profile data:", JSON.stringify(profileData));

    fetch('/api/profile_teacher', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      alert("You successfully added to your profile!")
      //setIsLoggedIn("True")
      history.push("/");
    }); //Close .then
    
  } //Close makeProfile function

  
  return ( 
   
    <div className="entry-form-wrapper">

     <br/>
     <h3>Adding to your profile helps families find you.</h3>
     <hr />
     <TeacherProfilePic />
     <hr />
     <br/>
    <Form>
      <Form.Group controlId="formBio">
        {/*<Form.Control type="textarea" rows="3" placeholder="Bio" value={userInputProfile.teacher_bio} name="teacher_bio" onChange={handleChange}/> */}
        <textarea class="form-control" placeholder="Bio" rows="3" value={userInputProfile.teacher_bio} name="teacher_bio" onChange={handleChange}></textarea>
      </Form.Group>

      <Form.Group controlId="formZipcode">
        <Form.Control type="text" placeholder="Zipcode" value={userInputProfile.zipcode} name="zipcode" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formPreferredDaysOfWeek">
        <Form.Control type="text" placeholder="Preferred Days of Week (e.g. 'Mon-Fri')" value={userInputProfile.days_of_week} name="days_of_week" onChange={handleChange}/> 
      
      </Form.Group>

      <Form.Group controlId="TeachingExperience">
        <Form.Control type="text" placeholder="Teaching Experience (total hours)" value={userInputProfile.teaching_experience_in_hours} name="teaching_experience_in_hours" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="PayRatePerHour">
        <Form.Control type="number" placeholder="Pay Rate per Hour" value={userInputProfile.pay_rate_per_hour} name="pay_rate_per_hour" onChange={handleChange}/> 
      </Form.Group>

      <Button variant="primary" onClick={makeProfile} type="submit">Update Profile</Button> 
    </Form>
  </div>

  );
}
    


function TeacherSignUpForm(props) {
  
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

    localStorage.setItem("user_email", userInputSignUp.signupemail);

    fetch('/api/signup_teacher', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData),
    })//Close fetch

    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", userInputSignUp.signupemail);
        console.log("***************set item useremail:", userInputSignUp.signupemail);
        console.log("***************get item useremail:", localStorage.getItem("useremail"));
        alert("You are now logged in!");
        console.log("***************props in loginform function post-response:", props);
        props.setLoggedInStatus("True");
        
        history.push("/profile_teacher");
    }}); //Close .then
    
  } //Close makeSignUp function



  return ( 
   
    <div className="entry-form-wrapper">
     <h3>Try Beanstalk Square today!</h3>
     <hr />
     <br/>
    <Form>
      <Form.Group controlId="formFirstName">
      
        <Form.Control type="text" placeholder="First Name" value={userInputSignUp.fname} name="fname" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formLastName">

        <Form.Control type="text" placeholder="Last Name" value={userInputSignUp.lname} name="lname" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formBasicEmail">

        <Form.Control type="email" placeholder="Enter email" value={userInputSignUp.signupemail} name="signupemail" onChange={handleChange}/> 
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">

        <Form.Control type="password" placeholder="Password" value={userInputSignUp.signuppassword} name="signuppassword" onChange={handleChange}/> 
      </Form.Group>

      <Button variant="primary" onClick={makeSignUp} type="submit">Complete Sign Up</Button> 
    </Form>
  </div>

  );
}




function ParentSignUpForm(props) {
  
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
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", userInputSignUp.signupemail);
        console.log("***************set item useremail:", userInputSignUp.signupemail);
        console.log("***************get item useremail:", localStorage.getItem("useremail"));
        alert("You are now logged in!");
        console.log("***************props in loginform function post-response:", props);
        props.setLoggedInStatus("True");
        history.push("/dashboard");
    }}); //Close .then
  }



  return ( 
   
   <div className="entry-form-wrapper">
     <h3>Try Beanstalk Square today!</h3>
     <hr />
     <br/>
    <Form>
      <Form.Group controlId="formFirstName">
      
        <Form.Control type="text" placeholder="First Name" value={userInputSignUp.fname} name="fname" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formLastName">

        <Form.Control type="text" placeholder="Last Name" value={userInputSignUp.lname} name="lname" onChange={handleChange}/> 
      </Form.Group>

      <Form.Group controlId="formBasicEmail">

        <Form.Control type="email" placeholder="Enter email" value={userInputSignUp.signupemail} name="signupemail" onChange={handleChange}/> 
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">

        <Form.Control type="password" placeholder="Password" value={userInputSignUp.signuppassword} name="signuppassword" onChange={handleChange}/> 
      </Form.Group>

      <Button className="btn btn-primary" variant="primary" onClick={makeSignUp} type="submit">Complete Sign Up</Button> 
    </Form>
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
    <div className="entry-form-wrapper">
      <br/>
      <h3>Welcome, back!</h3>
      {/*<hr />*/}
      <br/>
      <Form onSubmit={attemptLogIn} >
        <Form.Group controlId="formBasicEmail">
         
          <Form.Control type="email" placeholder="Enter Email Address" value={loginemail} name="loginemail" onChange={handleEmailChange}/> 
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
         
          <Form.Control type="password" placeholder="Password" value={loginpassword} name="loginpassword" onChange={handlePasswordChange}/> 
        </Form.Group>

        <Button className="btn btn-primary" type="submit">Submit</Button> 
      </Form>
  </div>
  );
      
  
} //Close the entire LogIn Function



function SignUpParties () {

  return (
  <Container className="linen-background">
    <Row>
    <br/>
    <br/>
    <Row/>
    <h3 className="centered-header">Let's get started! Please choose an option. </h3>
    </Row>
    <br/>
    <Row xs="12">
      
      <Col> </Col>
      <Col> </Col>
      <Col> </Col>
      <Col xs="4">
        <div className="rounded outline-card" id="sign-up-1"> 
          <h3>I'm a parent</h3>
            <p>Looking for students or a teacher.</p>
            <div >
            <Link key={1} to="/signup_parent" className="btn btn-primary" > Start search </Link>
            </div>
        </div>
      </Col>
      
      <Col> </Col>
      <Col> </Col>
      <Col xs="4">
        <div className="rounded outline-card" id="sign-up-2">
          <h3>I'm a teacher </h3>
            <p>Looking for students to teach.</p>
            <div>
            <Link key={2} to="/signup_teacher" className="btn btn-primary" >Start search </Link> 
            </div>
        </div>
      </Col>
      <Col> </Col>
      <Col> </Col>
      <Col> </Col>

    {/*<div className = "two-containers" >
    <br/>
    
      <div className="row">
        <div className = "col-3 bg-white rounded"> 
          <div className="outline-card" id="sign-up-1">
            
          </div>
          </div>
          <br/>
          
        </div>

        <div className="col-3 bg-white rounded"> 
          <div className="outline-card" id="sign-up-2">
            
          </div>
          </div>
          <br/>
          
        </div>
      </div>
    </div>  */}
    </Row>
  </Container>
  )
}



function GlobalNavigationBar(props) {
  console.log("props in Global nav:******", props)
  
  function LogOut(event) {

    console.log("***************local storage user islogged in before removal:", localStorage);
    localStorage.removeItem("user");
    console.log("***************local storage user islogged in after removal:", localStorage);

    alert("You are now logged out of your account.");
    props.setLoggedInStatus();
    

  }

  return (

    <div> 
    <Navbar bg="none" variant="light">
    <Navbar.Brand href="#home"><img src="static/img/beanstalksquarelogo.png" width="270px" height="40px"/></Navbar.Brand>
    <Nav className="navbar-nav ml-auto">
    
    <Form inline >
      {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          
          {props.isLoggedIn==="True"? 
          [<Link key={1} to="/" onClick={LogOut} className="btn bg-transparent nav-links nav-item" variant="btn-secondary" > Log Out </Link>]
          : [<Link key={1} to="/login" className="btn nav-links nav-item" variant="btn-secondary"> Log In </Link>, 
          <Link key={2} to="/signup" className="btn btn-primary nav-links nav-item" variant="btn-primary"> Sign Up </Link>]}
          
      {/*<Button variant="outline-primary">Search</Button> */}
    </Form>
    
    </Nav>
    
{/*    <Nav className="navbar-nav ml-auto">
    <Nav.Link href="#deets" className="nav-item" >More deets</Nav.Link>
    </Nav>*/}
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


  

function App() {
    
    //Use logic to determine if the user is logged in or not

  const [isLoggedIn, setIsLoggedIn] = React.useState("False");
  const [hasJustLoggedIn, setHasJustLoggedIn] = React.useState("False");
  
  const setLoggedInStatus = () => { 

    let loggedInStatus = localStorage.getItem('user')? "True" : "False";

    console.log("***************local storage user loggedInStatus:", loggedInStatus);

    if (loggedInStatus !=null) {
      console.log("*******setislogged in prior to setting it to loggedInStatus:", loggedInStatus)
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
      </Router>
      
      <div className="footer">
        <br/>
        <p>© 2020 Copyright: Beanstalk Square.<br/>
        All rights reserved.</p>
      </div>
    </div>

  );
}


ReactDOM.render(
  <App />, document.querySelector('#root')
);