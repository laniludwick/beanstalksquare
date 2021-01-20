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
    <React.Fragment>
      <div className="detail-results-table-wrapper">
        <div className="contact-button-position">
          <span><Link to={contact_teacher_link} className="btn btn-primary">Contact Teacher </Link></span>
          <div><br/></div>
        </div>
        <div className="card mx-auto w-100 card-width">
          <table>
            <tbody>
              <tr>
                <td id="table-vertical-align-top">
                  <div className="row no-gutters">
                    <div className="col-sm-3 card-image-position" >
                      <img src={teacherDetailsAll.img_url} />
                    </div>
                  </div>
                </td>
                <td>    
                  <div className="col-sm-11">
                    <div className="card-body">
                    <h5 className="card-title">{teacherDetailsAll.teacher_name}</h5>
                      <table className="text-alignment">
                        <tbody></tbody>
                      </table>
                      <p className="card-text"><b>Bio</b><br/>{teacherDetailsAll.bio}</p>
                      <p><b>Zipcode</b><br/>{teacherDetailsAll.zipcode}</p>         
                      <p><b>Availability</b><br/>{teacherDetailsAll.days_of_week}</p>     
                      <p><b>Teaching Experience</b><br/>{teacherDetailsAll.teaching_experience_in_hours} hrs</p>     
                      <p><b>Pay rate</b><br/>${teacherDetailsAll.pay_rate_per_hour}/hr</p>   
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>   
        </div><br/>
      </div><br/>
    </React.Fragment>
  );
}


export { Teacher, TeacherDetails }


