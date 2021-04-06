// ***** TeacherProfileForm and TeacherProfilePic components *****

import React from 'react';
import { useHistory } from 'react-router-dom'; 
import { Button, Form } from 'react-bootstrap';


export function TeacherProfilePic() {

  let history = useHistory();
  const [selectedFile, setSelectedFile] = React.useState(null); 
  const [dataResult, setDataResult] = React.useState(null);
  const user_email = localStorage.getItem("user_email");

  let widget = window.cloudinary.createUploadWidget({
    cloudName: "beanstalksquare",
    uploadPreset: "veumz4ue" },
    (error, data) => {});

  const handleFileChange = evt => {
    const file = evt.target.files[0];
    const fileName = evt.target.files[0].name;
    setSelectedFile(file);
    }
  const handleFileUpload = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', user_email);

    fetch('/api/profile_pic_teacher', {
      method: 'POST', 
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      // alert("You received a response, but need to read it.")
      setDataResult(data);
      localStorage.setItem("user_img", data);
    }); 
    // .catch(err => 
    //   console.log("Error caught:", err)
    // ); //Close catch  
  } 

  return ( 
    <Form>
      <Form.Group><br/>
    {/*    <Button id="opener" label="Your Profile Photo" name="profile-pic" onClick={widget.open} >Upload photo</Button>*/}
        {/*<Form.File />*/}
        {/*<br/>*/}
        {/*{selectedFile ? <div>Currently: {selectedFile.name}.</div>:<Button variant="primary" onClick={handleFileUpload} type="submit">Upload Photo</Button>} */}
        {selectedFile ? 
        <div>
          Currently: {selectedFile.name}
          <br/><br/>
          <Button variant="primary" onClick={handleFileUpload} type="submit"> Upload Selected File</Button> or <label className="bold" id="profile-pic-button" >
          <Form.File id="opener" label="Change File" name="profile-pic" onChange={handleFileChange} hidden />
          </label> 
        </div>
        : 
        <div>
          <p>Please select a profile photo.</p>
          <label className="btn btn-secondary" id="profile-pic-button" >
            <Form.File id="opener" label="Browse Files" name="profile-pic" onChange={handleFileChange} hidden />
          </label>
        </div>
        }
        {/*{selectedFile ? null: <div>Currently selected: None</div>}*/} 
      </Form.Group>
    </Form>
  );
}


export function TeacherProfileForm() {
  
  let history = useHistory();
  const user_email = localStorage.getItem("user_email");
  const user_img = localStorage.getItem("user_img");

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
  }
  const makeProfile = (e) => { 
    e.preventDefault();
    const profileData = {
                        "bio": userInputProfile.teacher_bio,
                        "zipcode": userInputProfile.zipcode,
                        "days_of_week": userInputProfile.days_of_week,
                        "teaching_experience_in_hours": userInputProfile.teaching_experience_in_hours,
                        "pay_rate_per_hour": userInputProfile.pay_rate_per_hour,
                        "img_url": user_img,
                        "user_email": user_email,
                        }
    fetch('/api/profile_teacher', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Result of .then data:", data);
      // alert("You successfully added to your profile!")
      //setIsLoggedIn("True")
      history.push("/");
    });
  } 

  return ( 
    <div className="entry-form-wrapper">
    <br/><h3>Adding to your profile helps families find you.</h3>
    <hr/><TeacherProfilePic /><hr/><br/>
    <Form>
      <Form.Group controlId="formBio">
        <textarea className="form-control" placeholder="Bio" rows="3" value={userInputProfile.teacher_bio} name="teacher_bio" onChange={handleChange}></textarea>
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
      <br/><br/><br/><br/>
  </div>
  );
}

