// ***** TeacherList and PodList components used in zipcode search results *****

function PodList(props) {
  
  console.log("data in for isLoggedIn in PodList component:", props.isLoggedIn);
  const [podList, setPodList] = React.useState([]);
  const [dataResult, setDataResult] = React.useState([]);
  const {zipcode} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    fetch(`/api/pods?zipcode=${zipcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    .then(response => response.json())
    .then(data => {
      console.log("data:", data);
      setDataResult(data);
      console.log("dataresult:", dataResult);
    }) 
  }, []); //Close useEffect

  React.useEffect(() => {
    //console.log("data in for loop in pod list:", data);
    const podComponentsList = [];

    for (let pod of dataResult) {
      console.log("pod:", pod);
      const podComponent = <Pod key={pod.pod_id}
                                pod_id={pod.pod_id}
                                pod_name={pod.pod_name}
                                zipcode={pod.zipcode}
                                days_per_week={pod.days_per_week}
                                total_hours_per_day={pod.total_hours_per_day}
                                paid_teacher={pod.paid_teacher}
                                isLoggedIn={props.isLoggedIn}
                                />
      console.log("pod component:", podComponent);
      podComponentsList.push(podComponent);
      console.log("pod components list:", podComponentsList);
    }; 
  
  setPodList(podComponentsList);
  }, [dataResult]);

  return ( 
    <div className="mx-auto" id="pod-list-title-row">
    <br/>
      {/*<div className="d-flex justify-content-between">    */}
      {/*<div className="mx-auto w-75">*/}
          <span className="float-left"> 
            <h3>{zipcode} Search Results</h3> 
            <br/>
          </span>

          <span className="float-right">
            {props.isLoggedIn==="True"? <Link key={1} to="/createpod" className="btn btn-primary" variant="btn-primary" > Start a pod </Link>: null}
          </span>
          <br/>
      <br/>

      <div className="search-results-wrapper">
      {/*<div className="search-results-table-wrapper-75">
        <table className="table table-corners">
          <thead>
            <tr> 
              <th scope="col" className="table-header-row">Pod name</th>
              <th scope="col" className="table-header-row">Zipcode</th>
              <th scope="col" className="table-header-row">Days</th>
              <th scope="col" className="table-header-row">Hours</th>
              <th scope="col" className="table-header-row">Paid teacher</th>
              <th scope="col" className="table-header-row">Details</th>
             {/* {props.isLoggedIn==="True"? <th scope="col">Details</th> : null}*/}
            {/*</tr> 
                */}
          {/*</thead>
          <tbody>*/}
          {podList}
          {/*</tbody>
        </table> */}
      </div>
    </div>
  );
} 


function TeacherList(props) {
  
  console.log("data in for isLoggedIn in TeacherList component:", props.isLoggedIn);
  const [teacherList, setTeacherList] = React.useState([]);
  const [dataResult, setDataResult] = React.useState([]);
  const {zipcode} = ReactRouterDOM.useParams();

  React.useEffect(() => {
    fetch(`/api/teachers?zipcode=${zipcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    .then(response => response.json())
    .then(data => {
      console.log("data:", data);
      setDataResult(data);
      console.log("dataresult:", dataResult);
    }) 
  }, []); 

  React.useEffect(() => {

    //console.log("data in for loop in pod list:", data);
    const teacherComponentsList = [];

    for (let teacher of dataResult) {
      const full_name = teacher.fname+" "+teacher.lname;

      if (teacher.pod_id == undefined) {
        console.log("teacher:", teacher);
        const teacherComponent = <Teacher key={teacher.teacher_id}
                                  teacher_id={teacher.teacher_id}
                                  bio={teacher.bio}
                                  email={teacher.email}
                                  mobile_number={teacher.mobile_number}
                                  teacher_name={full_name}
                                  zipcode={teacher.zipcode}
                                  pod_id={teacher.pod_id}
                                  img_url={teacher.img_url}
                                  days_of_week={teacher.days_of_week}
                                  teaching_experience_in_hours={teacher.teaching_experience_in_hours}
                                  pay_rate_per_hour={teacher.pay_rate_per_hour}
                                  isLoggedIn={props.isLoggedIn}
                                  />
        console.log("teacher component:", teacherComponent);
        teacherComponentsList.push(teacherComponent);
        console.log("teacher components list:", teacherComponentsList);
      }
    }; 
  
  setTeacherList(teacherComponentsList);
  }, [dataResult]);

  return ( 
    <div>
      <div>
        <br/><h3 className="mx-auto" id="teacher-list-title-row">{zipcode} Search Results</h3><br/>
      </div> 
    <div>
      {/*<div className="table-corners search-results-table-wrapper"> */}
{/*        <table className="table">
          <thead>
            <tr> 
              <th scope="col" className="table-header-row">Teacher</th>
              <th scope="col" className="table-header-row">Name</th>
              <th scope="col" className="table-header-row">Zipcode</th>
              <th scope="col" className="table-header-row">Availability</th>
              <th scope="col" className="table-header-row">Teaching Experience</th>
              <th scope="col" className="table-header-row">Pay Rate</th>
              <th scope="col" className="table-header-row">Details</th>
             {/* {props.isLoggedIn==="True"? <th scope="col">Details</th> : null}*/}
      {/*    </tr>     
          </thead>
          <tbody>*/}
          {teacherList}
         {/*} </tbody>
        </table> */}
      </div>
    </div>
  );
} 

export { PodList, TeacherList }