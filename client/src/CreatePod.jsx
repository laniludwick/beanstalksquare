// ***** CreatePod component *****

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';

function CreatePod() {
  
  let history = useHistory(); 
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
    const newValue = evt.target.type==="checkbox"? evt.target.checked : evt.target.value;
    setUserInputPod({[name]: newValue});
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
    })
    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data response for create pod:", data);
      if (data === "Successful pod creation") {
        alert("You successfully created a pod")
      }
      else {
        alert("Pod creation not successful.")
      }
      history.push('/')
    }); 
  }

  return (
    <div className="create-pod-form-wrapper"><br/>
    <h3>Add a new pod to Beanstalk Square</h3><hr/><br/>
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
      </Form.Group><br/>
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
          <Form.Control type="text" placeholder="Zipcode" value={userInputPod.zipcode} name="zipcode" onChange={handleChange}/> 
        </Form.Group>
      </Form.Row><br/>
      <Button variant="primary" onClick={makePod} type="submit">Create Pod</Button><br/><br/>
    </Form><br/><br/><br/><br/>
  </div>
  );
}

export default CreatePod;