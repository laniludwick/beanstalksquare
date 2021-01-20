// ***** TeacherInPod, TeachersInPodList, Child, and ChildrenInPod components, used on pod details page *****

function TeacherInPod(props) {

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td id="table-vertical-align-top">
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src={props.img_url} />
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                  <table className="text-alignment">
                    <tbody></tbody>
                  </table>
                  <p className="card-text"><b>Bio</b><br/>{props.bio}</p>
                  <p><b>Teaching Experience</b><br/>
                    {props.teaching_experience_in_hours} hrs</p>         
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>     
    </div>  
  );
}


function TeachersInPodList(props) {

  const [teachersInPod, setTeachersInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    fetch(`/api/teachersinpod/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      const teacherComponentsList = [];

      for (const teacher of data) {
        const full_name = teacher.fname +" "+ teacher.lname;
        const teacherComponent = <TeacherInPod 
                                  key={teacher.teacher_id}
                                  name={full_name}
                                  bio={teacher.bio}
                                  img_url={teacher.img_url}
                                  teaching_experience_in_hours={teacher.teaching_experience_in_hours}
                                  pay_rate_per_hour={teacher.pay_rate_per_hour}
                                  />
        teacherComponentsList.push(teacherComponent);
        }
      setTeachersInPod(teacherComponentsList); 
    });
  }, [])
  
  return ( 
    <div>
      <h3>Teacher(s)</h3>
      {teachersInPod}
  </div>
  )
}


function Child(props) {

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src="/static/img/child.png"/>
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                  <table className="text-alignment">
                    <tbody>
                      <tr>
                        <th> Gender</th>
                        <th className="table-padding">Grade</th>
                        <th className="table-padding">School</th>
                        <th className="table-padding">Program</th>
                      </tr>
                      <tr>
                        <td >{props.gender}</td>
                        <td className="table-padding">{props.grade_name}</td>
                        <td className="table-padding">{props.school_name}</td>
                        <td className="table-padding">{props.school_program}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="card-text"></p>   
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


function ChildrenInPodList(props) {

  const [childrenInPod, setChildrenInPod] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    fetch(`/api/children/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      const childComponentsList = [];

      for (const child of data) {
        const full_name = child.fname+" "+child.lname;
        const childElement = <Child 
                                  key={child.child_id}
                                  full_name={full_name}
                                  gender={child.gender}
                                  zipcode={child.zipcode}
                                  grade_name={child.grade_name}
                                  school_program={child.school_program}
                                  school_name={child.school_name}
                                  />
        childComponentsList.push(childElement);
      }
      setChildrenInPod(childComponentsList); 
    });
  }, [])
  
  return ( 
    <div><br/>
    <h3 className="table-title">Students</h3><br/>
      {childrenInPod}<br/><br/>
    </div>
  )
}

