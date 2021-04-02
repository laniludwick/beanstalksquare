// ***** PodDetailsStats, PodDetailsStatsAndMap, and PodDetailsContainer components, used on pod details page *****


function PodDetailsStats (props) {

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title id="pod-details-title">{props.pod_name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <table >
          <tbody>
          <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Maximum Child Capacity:</b>   {props.max_child_capacity}</td><td className="table-data-width-pod-details"><b>Same School Program:</b>   {props.same_school_program_only}</td></tr>
          </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Days:</b>   {props.days_per_week}/week</td><td className="table-data-width-pod-details"><b>Same Grade:</b>   {props.same_grade_only}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Hours:</b>   {props.total_hours_per_day} hrs/day</td><td className="table-data-width-pod-details"><b>Meets Outdoors Only:</b>   {props.outdoors_only}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Paid teacher:</b>   {props.paid_teacher}</td><td className="table-data-width-pod-details"><b>Periodic Covid Testing:</b>   {props.periodic_covid_testing}</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
        <ListGroupItem>
          <table >
            <tbody>
              <tr className="table-width-pod-details"><td className="table-data-width-pod-details"><b>Same School:</b>   {props.same_school_only}</td><td className="table-data-width-pod-details"><b>Cost:</b>   ${props.cost_per_hour}/hr</td></tr>
            </tbody>
          </table>
        </ListGroupItem>
      </ListGroup>
    </Card>
  )
}

function PodDetailsStatsAndMap(props) {

  const [podDetailsStats, setPodDetailsStats] = React.useState(null);
  const {podId} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    console.log("Beg of getPodDetails");
    fetch(`/api/pods/${podId}`, {
      method: 'GET',
    }) 
    .then(response => response.json())
    .then(data => { 
      console.log("data in pod details response:", data);
      const podComponentsList = [];

      for (const pod of data) {
        const podDetailsComponent = <PodDetailsStats
                                  key={pod.pod_id}
                                  pod_id={pod.pod_id}
                                  pod_name={pod.pod_name}
                                  street_address={pod.street_address}                                    
                                  city={pod.city} 
                                  state={pod.state}
                                  zipcode={pod.zipcode}
                                  max_child_capacity={pod.max_child_capacity}
                                  days_per_week={pod.days_per_week}
                                  total_hours_per_day={pod.total_hours_per_day}
                                  paid_teacher={pod.paid_teacher}
                                  same_school_only={pod.same_school_only}
                                  same_school_program_only={pod.same_school_program_only}
                                  same_grade_only={pod.same_grade_only}
                                  outdoors_only={pod.outdoors_only}
                                  periodic_covid_testing={pod.periodic_covid_testing}
                                  cost_per_hour={pod.cost_per_hour}
                                  />
        console.log("pod details component:", podDetailsComponent);
        setPodDetailsStats(podDetailsComponent);  
      }
    });
  }, [])
  console.log("Looking for pod details:", podDetailsStats)
  
  return ( 
    <div><br/>
    <h3 className="table-title"> Pod Details </h3><br/>
      {podDetailsStats} 
      <div width="50%"><br/>
        {podDetailsStats? <MapContainer podDetailsStats={podDetailsStats}/> : null}
      </div>
    </div>
  )
}


function PodDetailsContainer(props) {

  const {podId} = ReactRouterDOM.useParams();
  const contact_pod_organizers_link = `/contactpodorganizer/${podId}`

  return (
    <div>
      <div className="detail-results-table-wrapper">
        <div className="contact-button-position">
          <Link to={contact_pod_organizers_link} className="btn btn-primary">Contact Pod Organizer </Link> 
        </div>
        <div width="50%">
          <PodDetailsStatsAndMap /> 
        </div>
        <div width="50%"><br/><br/>
          <TeachersInPodList />
        </div>
        <div width="50%" className="bottom-padded"><br/>
          <ChildrenInPodList /><br/><br/>
        </div>
      </div>
    </div>    
  )
}

