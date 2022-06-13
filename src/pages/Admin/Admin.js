import "./Admin.css"
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '../../Components/Sidebar'
import { BsLayoutSidebarInset, BsLightningCharge } from 'react-icons/bs';
import { TbArrowUpRightCircle } from 'react-icons/tb';
import { ImBlocked } from 'react-icons/im';
import { BiPencil } from 'react-icons/bi';
import { useState } from 'react';
import { CardBody, Col, Row, Card, Container } from "reactstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import MaterialTable from "@material-table/core";
import { Modal ,Button} from "react-bootstrap";


function Admin() {

  //sidebar

  const [showsidebar, setsidebar] = useState(true)

  //modal
  const [showmodal, setshowmodal] = useState(false)


  const togglesidebar = () => {
    setsidebar(!showsidebar)
    console.log("clicked")
  }


  const openmodal = () => {
    setshowmodal(true)
  }

  const closemodal = () => {
    setshowmodal(false)
  }


  const Cards = [
    {
      icon: <BiPencil style={{ color: "rgb(95, 201, 253)" }} className="card-icon" />,
      title: "Open",
      color: "rgb(95, 201, 253)",
      pathcolor: "rgb(1, 107, 235)"
    },
    {
      icon: <BsLightningCharge style={{ color: "rgb(88, 230, 152)" }} className="card-icon" />,
      title: "Progress",
      color: "rgb(88, 230, 152)",
      pathcolor: "rgb(8, 152, 3)"
    },
    {
      icon: <TbArrowUpRightCircle style={{ color: "rgb(253, 206, 125)" }} className="card-icon" />,
      title: "Closed",
      color: "rgb(253, 206, 125)",
      pathcolor: "rgb(196, 129, 13)"
    },
    {
      icon: <ImBlocked style={{ color: "rgb(253, 158, 114)" }} className="card-icon" />,
      title: "Blocked",
      color: "rgb(253, 158, 114)",
      pathcolor: "rgb(201, 80, 24)"
    },
  ]




  return (



    <div>




      <Sidebar state={showsidebar} />

      <BsLayoutSidebarInset className="toggle-icon float-end my-2 mx-3" onClick={togglesidebar} />


      <Container className={showsidebar ? "active-contain" : "inactive-contain"} >



        <div className="mb-5 mx-3">
          <h1 className="text-dark">Welcome admin</h1>
          <p style={{ opacity: "0.5" }}>Take a quick looks at your admin stats</p>
        </div>


        <Container className="col-12 mb-5  ">


          <Row className="mx-1">


            {Cards.map((ele, index) => (
              <Col key={index} className="col-lg-3  my-2  col-md-4 col-sm-6 ">

                <Card style={{ background: ele.color }} className="cards">

                  <CardBody>

                    <div className="card-box bg-light">
                      {ele.icon}
                      <h5 className="text-dark my-1 mx-2">{ele.title}</h5>
                    </div>


                    <div className="circle">

                      <h4>80</h4>
                      <div className="float-end my-4" style={{ width: "70px", height: "70px" }}>
                        <CircularProgressbar strokeWidth={12} value={50} styles={buildStyles({
                          pathColor: ele.pathcolor

                        })} />
                      </div>

                    </div>


                  </CardBody>


                </Card>

              </Col>))}

          </Row>

        </Container>

        <div style={{ marginLeft: "20px" }} className="mb-5 " >
          <MaterialTable columns={[
            {
              title: "UserId",
              field: "userId"
            },
            {
              title: "Name",
              field: "name"
            }, {
              title: "Status",
              field: "status",
              lookup: {
                "APPROVED": "APPROVED",
                "PENDING": "PENDING",
                "REJECT": "REJECT"
              }
            }
          ]}
            data={
              [{
                name: "VIGNESH",
                userId: 202,
                status: "PENDING"
              }]
            }
          />
        </div>

        <button onClick={openmodal} className="btn btn-dark mx-4">click here</button>
        <Modal show={showmodal} backdrop="static" onHide={closemodal} centered >

          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <form >


              <h5 className="text-dark" style={{ opacity: "0.5" }}>User ID :</h5>
              <hr />

              <div className="input-group mb-3">
                <span className="input-group-text "> Name</span>
                <input type="text" placeholder="Enter Username" className="form-control" />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text ">Email</span>
                <input type="email" placeholder="Enter Email" className="form-control" />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text px-3"> Type  </span>
                <select className="form-select">
                  <option value={"admin"} >ADMIN</option>
                  <option value={"engineer"}>ENGINEER</option>
                  <option value={"customer"}>CUSTOMER</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text "> Status</span>
                <select className="form-select">
                  <option value={"approved"}>APPROVED</option>
                </select>
              </div>

            </form>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={closemodal} variant="secondary">Close</Button>
            <Button variant="primary">Update</Button>
          </Modal.Footer>
        </Modal>

      </Container>






    </div>




  )
}

export default Admin