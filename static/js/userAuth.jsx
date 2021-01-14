//***** LogInForm component *****

const { Button, Form } = ReactBootstrap;

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
    const logInData = {
                        "loginemail": loginemail,
                        "loginpassword": loginpassword,
                        }           
    fetch('/api/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logInData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token){
        localStorage.setItem("user", data.access_token);
        localStorage.setItem("useremail", logInData["loginemail"]);
        props.setLoggedInStatus("True");
        history.push("/dashboard");
      }
      else {
        alert("Incorrect email address or password. Please try again.")
      }
    }); 
  } 
  
  return ( 
    <div className="entry-form-wrapper">
    <br/><h3>Welcome, back!</h3><br/>
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
} 

export default LogInForm;