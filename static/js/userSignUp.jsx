// ***** SignUpParties, TeacherSignUpForm, and ParentSignUpForm components *****

function SignUpParties () {
  return (
  <Container className="linen-background">
    <Row>
      <br/><br/>
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
          <div>
            <Link key={1} to="/signup_parent" className="btn btn-primary" > Begin</Link>
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
            <Link key={2} to="/signup_teacher" className="btn btn-primary" >Begin</Link> 
          </div>
        </div>
      </Col>
      <Col> </Col>
      <Col> </Col>
      <Col> </Col>
    </Row>
  </Container>
  )
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
  }
  const makeSignUp = (e) => {  
    e.preventDefault();
    const signUpData = {"fname": userInputSignUp.fname, 
                        "lname": userInputSignUp.lname,
                        "signupemail": userInputSignUp.signupemail,
                        "signuppassword": userInputSignUp.signuppassword,      
                        }
    localStorage.setItem("user_email", userInputSignUp.signupemail);

    fetch('/api/signup_teacher', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", userInputSignUp.signupemail);
        // alert("You are now logged in!");
        //console.log("props in loginform function post-response:", props);
        props.setLoggedInStatus("True");
        history.push("/profile_teacher");
      }
    }); 
  } 
  return ( 
    <div className="entry-form-wrapper">
    <h3>Try Beanstalk Square today!</h3>
    <hr/><br/>
      <Form>
        <Form.Group controlId="formFirstName">
          <Form.Control type="text" placeholder="First Name" value={userInputSignUp.fname} name="fname" onChange={handleChange}/> 
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Control type="text" placeholder="Last Name" value={userInputSignUp.lname} name="lname" onChange={handleChange}/> 
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter email" value={userInputSignUp.signupemail} name="signupemail" onChange={handleChange}/> 
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
  }
  const makeSignUp = (e) => {
    e.preventDefault();
    const signUpData = {"fname": userInputSignUp.fname, 
                        "lname": userInputSignUp.lname,
                        "signupemail": userInputSignUp.signupemail,
                        "signuppassword": userInputSignUp.signuppassword,
                        }                
    fetch('/api/signup_parent', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", userInputSignUp.signupemail);
        // alert("You are now logged in!");
        props.setLoggedInStatus("True");
        history.push("/dashboard");
      }
    }); 
  }
  return ( 
    <div className="entry-form-wrapper">
    <h3>Try Beanstalk Square today!</h3>
    <hr/><br/>
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

export { SignUpParties, TeacherSignUpForm, ParentSignUpForm }