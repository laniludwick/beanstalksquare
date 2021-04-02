// ***** Teacher component, used in teacher search results *****

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