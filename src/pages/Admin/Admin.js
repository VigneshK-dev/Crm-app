import "./Admin.css"
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '../../Components/Sidebar'
import { BsLayoutSidebarInset, BsLightningCharge } from 'react-icons/bs';
import { TbArrowUpRightCircle } from 'react-icons/tb';
import { ImBlocked } from 'react-icons/im';
import { BiPencil } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { CardBody, Col, Row, Card, Container } from "reactstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import MaterialTable from "@material-table/core";
import { Modal, Button } from "react-bootstrap";
import { fetchtickets, updatefetchtickets } from "../../Api/ticket";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchuser } from "../../Api/user";


function Admin() {



  //sidebar
  const [showsidebar, setsidebar] = useState(true)

  //modal
  const [showmodal, setshowmodal] = useState(false)

  //fetch tickets 
  const [alltickets, setalltickets] = useState([])

  //fetch user
  const [alluser, setalluser] = useState([])

  //edit tickets
  const [selectedTicket, setselectedTicket] = useState({})

  //ticket card
  const [ticketcard, setTicketcard] = useState({})

  const Cards = [
    {
      icon: <BiPencil style={{ color: "rgb(95, 201, 253)" }} className="card-icon" />,
      title: "Open",
      value: ticketcard.open,
      color: "rgb(95, 201, 253)",
      pathcolor: "rgb(1, 107, 235)"

    },
    {
      icon: <BsLightningCharge style={{ color: "rgb(88, 230, 152)" }} className="card-icon" />,
      title: "Progress",
      value: ticketcard.pending,
      color: "rgb(88, 230, 152)",
      pathcolor: "rgb(8, 152, 3)"
    },
    {
      icon: <TbArrowUpRightCircle style={{ color: "rgb(253, 206, 125)" }} className="card-icon" />,
      title: "Closed",
      value: ticketcard.closed,
      color: "rgb(253, 206, 125)",
      pathcolor: "rgb(196, 129, 13)"
    },
    {
      icon: <ImBlocked style={{ color: "rgb(253, 158, 114)" }} className="card-icon" />,
      title: "Blocked",
      value: ticketcard.blocked,
      color: "rgb(253, 158, 114)",
      pathcolor: "rgb(201, 80, 24)"
    },
  ]


  const togglesidebar = () => {
    setsidebar(!showsidebar)
  }


  // const openmodal = () => {
  //   setshowmodal(true)
  // }

  const closemodal = () => {
    setshowmodal(false)
  }


  const Gettickets = async () => {
    fetchtickets().then(response => {
      // console.log(response)
      if (response.status === 200) {
        setalltickets(response.data)
        updatecard(response.data) 
      }
    })
      .catch(error => console.log(error))
  }


  const Getuser = async () => {
    fetchuser().then(response => {
      // console.log(response)
      if (response.status === 200) {
        setalluser(response.data)
      }
    })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    // let userId = localStorage.getItem("userId")
    Gettickets()
    Getuser()
  }, [])



  //edit ticket and make a copy of selected row and open modal on row click 
  const editalltickets = (data) => {
    const tickets = {
      assignee: data.assignee,
      description: data.description,
      id: data.id,
      reporter: data.reporter,
      status: data.status,
      ticketPriority: data.ticketPriority,
      title: data.title
    }
    setselectedTicket(tickets)
    setshowmodal(true)
  }


  //change the value of title 
  const changeTicket = (e) => {
    if (e.target.name === "title") {
      selectedTicket.title = e.target.value
    }
    else if (e.target.name === "description") {
      selectedTicket.description = e.target.value
    }
    updateselectedTickets(Object.assign({}, selectedTicket))
  }


  const updateselectedTickets = (data) => {
    setselectedTicket(data)
  }



  const updateTicket = (e) => {
    e.preventDefault()
    updatefetchtickets(selectedTicket.id, selectedTicket)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setshowmodal(false)
        }
      })
      .catch(err => console.log(err))
  }


  const updatecard = (tickets) => {
    const data = {
      pending: 0,
      open: 0,
      closed: 0,
      blocked: 0
    }
    tickets.forEach(item => {
      if (item.status === "PENDING") {
        data.pending++
      } else if (item.status === "OPEN") {
        data.open++
      } else if (item.status === "CLOSED") {
        data.closed++
      } else if (item.status === "BLOCKED") {
        data.blocked++
      }
    })
    setTicketcard(Object.assign({}, data))
  }



  return (



    <div>



      <Sidebar state={showsidebar} />

      <BsLayoutSidebarInset className="toggle-icon float-end my-2 mx-3" onClick={togglesidebar} />


      <Container className={showsidebar ? "active-contain" : "inactive-contain"} >



        <div className="mb-5 mx-4 my-2">
          <h1 className="text-dark">Welcome admin</h1>
          <p style={{ opacity: "0.5" }}>Take a quick looks at your admin stats</p>
        </div>


        <Container className="col-12 mb-5  ">


          <Row className="mx-2">


            {Cards.map((ele, index) => (
              <Col key={index} className="col-lg-3 my-2 col-md-4 col-sm-6 ">

                <Card style={{ background: ele.color }} className="cards">

                  <CardBody>

                    <div className="card-box bg-light">
                      {ele.icon}
                      <h5 className="text-dark my-1 mx-2">{ele.title}</h5>
                    </div>


                    <div className="circle">

                      <h4>{ele.value}</h4>
                      <div className="float-end my-4" style={{ width: "70px", height: "70px" }}>
                        <CircularProgressbar strokeWidth={12} value={ele.value} styles={buildStyles({
                          pathColor: ele.pathcolor

                        })} />
                      </div>

                    </div>


                  </CardBody>


                </Card>

              </Col>))}

          </Row>

        </Container>


        <Container >

          <div style={{ marginLeft: "20px" }} className="mb-5 " >
            <MaterialTable
              onRowClick={(e, rowData) => editalltickets(rowData)}
              columns={[
                {
                  title: "Id",
                  field: "id"
                },
                {
                  title: "Title",
                  field: "title"
                }, {
                  title: "Description",
                  field: "description"
                }, {
                  title: "Reporter",
                  field: "reporter"
                },
                {
                  title: "TicketPriority",
                  field: "ticketPriority"
                },
                {
                  title: "Assignee",
                  field: "assignee"
                },
                {
                  title: "Status",
                  field: "status",
                  lookup: {
                    "OPEN": "OPEN",
                    "BLOCKED": "BLOCKED",
                    "CLOSED": "CLOSED",
                    "IN_PROGRESS": "IN_PROGRESS"
                  }

                }

              ]}

              options={{
                filtering: true,
                exportMenu: [{
                  label: "Export Pdf",
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, "Ticket Records")
                }, {
                  label: "Export Csv",
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, "Ticket Records")
                },

                ],
                headerStyle: {
                  backgroundColor: "black",
                  color: "white"
                },

              }}
              data={alltickets}
              title="TICKET RECORDS"
            />
          </div>


          <Modal show={showmodal} backdrop="static" onHide={closemodal} centered >

            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <form >
                <h5 className="text-dark" style={{ opacity: "0.5" }}>Ticket ID :{selectedTicket.id}</h5>
                <hr />

                <div className="input-group mb-3">
                  <span className="input-group-text "> Title</span>
                  <input type="text" name="title" value={selectedTicket.title} onChange={changeTicket} className="form-control" />
                </div>


                <div className="input-group mb-3">
                  <span className="input-group-text "> Description</span>
                  <input type="text" name="description" value={selectedTicket.description} onChange={changeTicket} className="form-control" />
                </div>



                {/* <div className="input-group mb-3">
      <span className="input-group-text px-3">Type</span>
      <select className="form-select">
        <option value={"admin"} >ADMIN</option>
        <option value={"engineer"}>ENGINEER</option>
        <option value={"customer"}>CUSTOMER</option>
      </select>
    </div> */}

                {/* <div className="input-group mb-3">
      <span className="input-group-text ">Status</span>
      <select className="form-select">
        <option value={"approved"}>APPROVED</option>
      </select>
    </div> */}

                <Button type="submit" variant="dark" onClick={updateTicket}>Update</Button>

              </form>

            </Modal.Body>
          </Modal>



          <div style={{ marginLeft: "20px" }} className="mb-5 " >
            <MaterialTable

              columns={[
                {
                  title: "UserId",
                  field: "userId"
                },
                {
                  title: "Name",
                  field: "name"
                }, {
                  title: "Email",
                  field: "email"
                },
                {
                  title: "UserTypes",
                  field: "userTypes",
                  lookup: {
                    "CUSTOMER": "CUSTOMER",
                    "ADMIN": "ADMIN",
                    "ENGINEER": "ENGINEER",
                  }

                },
                {
                  title: "UserStatus",
                  field: "userStatus"
                },

              ]}
              data={alluser}

              options={{
                filtering:true,
                exportMenu: [{
                  label: "Export Pdf",
                  exportFunc: (cols, rows) => ExportPdf(cols, rows, "User Records")
                }, {
                  label: "Export Csv",
                  exportFunc: (cols, rows) => ExportCsv(cols, rows, "User Records")
                },

                ],
                headerStyle: {
                  backgroundColor: "black",
                  color: "white"
                },

              }}

              title="USER RECORDS"
            />
          </div>
        </Container>


      </Container>




    </div>




  )
}

export default Admin