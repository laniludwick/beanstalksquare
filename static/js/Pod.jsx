// ***** Pod component, used in pod search results *****

function Pod(props) {

  const podDetailsLink = `/poddetails/${props.pod_id}`;

  return (
    <div className="card mx-auto w-100 card-width">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="row no-gutters">
                <div className="col-sm-3 card-image-position" >
                  <img src="/static/img/planticon.png" className="search-list-img"/>
                </div>
              </div>
            </td>
            <td>    
              <div className="col-sm-11">
                <div className="card-body">
                <h5 className="card-title">{props.pod_name}</h5>
                  <table className="text-alignment">
                    <tbody>
                      <tr>
                        <th> Zipcode</th>
                        <th className="table-padding">Days</th>
                        <th className="table-padding">Hours</th>
                        <th className="table-padding">Paid Teacher</th>
                      </tr>
                      <tr>
                        <td >{props.zipcode}</td>
                        <td className="table-padding">{props.days_per_week}/week</td>
                        <td className="table-padding">{props.total_hours_per_day} hrs/day</td>
                        <td className="table-padding">{props.paid_teacher}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="card-text"></p>
                    {props.isLoggedIn==="True"? <Link to={podDetailsLink} className="btn btn-primary" variant="primary"> View Details </Link>:<Link to="/login" className="btn btn-primary" variant="primary"> Login to View Details </Link>}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}