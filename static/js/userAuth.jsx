// ***** LogInForm component *****

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
    })

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