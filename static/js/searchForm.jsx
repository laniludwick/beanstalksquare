// ***** PodSearch and TeacherSearch components used during zipcode search on landing page *****

const { Button, Form } = ReactBootstrap;

function PodSearch(props) {

  const [zipcode, setZipcode] = React.useState("");
  const history = ReactRouterDOM.useHistory(); 

  function handleChange(event) {
    setZipcode(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
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
  const history = ReactRouterDOM.useHistory(); 

  function handleChange(event) {
    setZipcode(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
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

  