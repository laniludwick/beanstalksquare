// ***** PodSearch and TeacherSearch components used during zipcode search on landing page *****

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
    ); 
  }  


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
    ); 
  } 

  export { PodSearch, TeacherSearch }