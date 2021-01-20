// ***** ContactTeacher and ContactPodOrganizer components, which use Twilio's API *****

const { Button, Form } = ReactBootstrap;

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
    const useremail = localStorage.getItem("useremail");

    const textData = {"name": userInputSms.name, 
                        "phone": userInputSms.phone,
                        "email": userInputSms.email,
                        "message": userInputSms.message,
                        }

    fetch(`/api/send_stock_sms_teacher/${teacherId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textData),
    })
    .then(response => response.json())
    .then(data => {
      if (data === "Successful message") {
        alert("Your message was successfully sent")
      }
      else {
        alert("Your message was not sent. Please try again.")
      }
      history.push(`/teacherdetails/${teacherId}`);
    }); 
  }

  return ( 
    <div className="contact-form-wrapper">
    <h3>Send a message to the teacher</h3><hr/><br/>
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
          <textarea class="form-control" placeholder="Message" rows="3" value={userInputSms.message} name="message" onChange={handleChange}></textarea>
        </Form.Group>
        <Button variant="primary" onClick={contactTeacher} type="submit">Send message</Button> 
      </Form>
    </div>
  );
}


function ContactPodOrganizer() {
  
  const {podId} = ReactRouterDOM.useParams();
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
    const useremail = localStorage.getItem("useremail");

    const textData = {"name": userInputSms.name, 
                        "phone": userInputSms.phone,
                        "email": userInputSms.email,
                        "message": userInputSms.message,
                        }
    fetch(`/api/send_stock_sms_pod/${podId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textData),
    })
    .then(response => response.json())
    .then(data => {
      if (data === "Successful message") {
        alert("Your message was successfully sent")
      }
      else {
        alert("Your message was not sent. Please try again.")
      }
      history.push(`/poddetails/${podId}`);
    }); 
  }

  return ( 
    <div className="contact-form-wrapper">
    <h3>Send a message to this pod's organizer(s)</h3><hr/><br/>
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
          <textarea class="form-control" placeholder="Message" rows="3" value={userInputSms.message} name="message" onChange={handleChange}></textarea>
        </Form.Group>
        <Button variant="primary" onClick={contactPodOrganizer} type="submit">Send message</Button> 
      </Form>
    </div>
  );
}

