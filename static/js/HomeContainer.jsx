// ***** HomeContainer and Benefits components, used on the landing page *****

function HomeContainer() {

  const [linkStatus, setLinkStatus] = React.useState("find_students");
  const [originalStatus, setOriginalStatus] = React.useState("active-style;");
  const [oppositeStatus, setOppositeStatus] = React.useState("");

  const clickStudents = () => {
    setLinkStatus("find_students");
    setOriginalStatus("active-style");
    setOppositeStatus("");
  }
  const clickTeachers = () => {
    setLinkStatus("find_teachers");
    setOriginalStatus("");
    setOppositeStatus("active-style");
  }

  return (
    <div>
      <div className="hero">
        <map name="heromap">
          <area shape="rect" id="find-students" coords="10,140,150,250" onClick={clickStudents} alt="FindStudents" />
          <area shape="rect" id="find-teachers" coords="150,140,300,250" onClick={clickTeachers} alt="FindTeachers"  />
        </map>
      </div>
      <div className="upper-hero-text">
        Engage in distance learning together.
      </div>
      <div>
        <div className="hero-search-options">
          {linkStatus=="find_students"? 
          [<Link to="" key="0" name="find-students" className="filtered-search a-search active-style" onClick={clickStudents} id="find-students"> Find Students </Link>,
          <Link to="" key="1" name="find-teachers" className="filtered-search a-search" onClick={clickTeachers} id="find-teachers" > Find Teachers</Link>] : 
          [<Link to="" key="3" name="find-students" className="filtered-search a-search" onClick={clickStudents} id="find-students"> Find Students </Link>,
          <Link to="" key="4" name="find-teachers" className="filtered-search a-search active-style" onClick={clickTeachers} id="find-teachers" > Find Teachers</Link>]}
          <h5> </h5>
          {linkStatus=="find_students"? <PodSearch  /> : <TeacherSearch />}
        </div>
      </div>
      <div className="middle-left">
      </div>
      <br/>
      <div className="card-deck">
        <Benefits />
      </div>
    </div>
  )
}


function Benefits() {

  return (
    <div className="card-deck-exterior-padding">
      <Container fluid>
        <Row>
          <Col>
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>Contact Nearby Families</Card.Title>
                  <Card.Text>
                    Get in touch with other families to discuss joining a pod together.
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits1.jpg" />
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Limit Your Risk Exposure</Card.Title>
                  <Card.Text>
                    Stay safe by finding a small group of other children to study or play with.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits2.jpg" />
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Gain Social Interaction</Card.Title>
                  <Card.Text>
                    Social interaction is important for children to meet developmental milestones.
                  </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src="/static/img/benefits3.jpg" />
              </Card>
            </CardDeck>
          </Col>
        </Row>  
      </Container>
    </div>
  );
}
  
  