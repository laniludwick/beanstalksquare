// ***** Teacher and TeacherDetails components, used in teacher search results *****

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
                  <img src={props.img_url} className="search-list-img"/>
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


function TeacherDetails(props) {

  const [teacherDetailsAll, setTeacherDetailsAll] = React.useState({});
  const {teacherId} = ReactRouterDOM.useParams();
  const contact_teacher_link = `/contactteacher/${teacherId}`

  React.useEffect(() => { 
      console.log("Beg of getTeacherDetails");
      fetch(`/api/teachers/${teacherId}`, {
        method: 'GET',
      }) 
      .then(response => response.json())
      .then(data => { 
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
      }); 
      }, []) 
      console.log("Teacher details state:", teacherDetailsAll);

  return ( 
    <div className="detail-results-table-wrapper"><br/><br/>
      <div>
        <Link to={contact_teacher_link} className="btn btn-primary btn-primary:hover">Contact Teacher </Link> 
      </div><br/><br/>
      <table className="table table-corners" id="teacher-detail-results-table-wrapper">
        <thead>
          <tr> 
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

export { Teacher, TeacherDetails }