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
import { fetchuser ,updateuser } from "../../Api/user";
import { Spinner } from 'reactstrap';
import { ToastContainer,toast } from 'react-toastify';


function Admin() {



  //sidebar
  const [showsidebar, setsidebar] = useState(true)

  //user modal 
  const [usermodal, setusermodal] = useState(false)

  //fetch user
  const [alluser, setalluser] = useState([])

  //edit users
  const [selectedUser, setselectedUser] = useState({})



  //ticket modal
  const [ticketmodal, setticketmodal] = useState(false)

  //fetch tickets 
  const [alltickets, setalltickets] = useState([])

  //edit tickets
  const [selectedTicket, setselectedTicket] = useState({})

  //ticket card
  const [ticketcard, setTicketcard] = useState({})


  //loading 
  const [loading, setloading] = useState(false)





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

  useEffect(() => {
    // let userId = localStorage.getItem("userId")
    Gettickets()
    Getuser()
  }, [])


  //toggle side bar 
  const togglesidebar = () => {
    setsidebar(!showsidebar)
  }


  //close ticket modal
  const closeticketmodal = () => {
    setticketmodal(false)
  }


  //close user modal 
  const closeusermodal = () => {
    setusermodal(false)
  }


  //fetch users
  const Getuser = async () => {
    fetchuser().then(response => {
      // console.log(response)
      if (response.status === 200) {
        setalluser(response.data)
      }
    })
      .catch(error => console.log(error))
  }


  //edit user and make a copy of selected row and open modal on row click 
  const editallusers = (data) => {
    const users = {
      email: data.email,
      name: data.name,
      userId: data.userId,
      userStatus: data.userStatus,
      userTypes: data.userTypes,
    }
    // console.log(users)
    setselectedUser(users)
    setusermodal(true)
 
     

  }

 //change the value 
  const changeUser =(e)=>{
    if (e.target.name === "name") {
      selectedUser.name = e.target.value
    } else if (e.target.name === "email") {
      selectedUser.email = e.target.value
    } else if (e.target.name === "type") {
      selectedUser.userTypes = e.target.value
    } else if (e.target.name === "status") {
      selectedUser.userStatus = e.target.value
    }
  updateselectedUsers(Object.assign({},selectedUser))
  }
 
  const updateselectedUsers =(data)=>{
       setselectedUser(data)
  }
  

  //update user 

  const updateUser = (e)=>{
    e.preventDefault()
    setloading(true)
    updateuser(selectedUser.userId,selectedUser)
    .then (response =>{
      setloading(false)
        if(response.status === 200){
                //  console.log(response)
                 setusermodal(false)  
                 return toast( "User record has been updated successfully" , {type:"success"})
        } 
    }).catch(error =>{
            setloading(false)
            console.log(error)
            return toast(  "Oops user record not updated successfully" , {type:"error"} )  
    })
      
  
  }




  //fetch tickets
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
    setticketmodal(true)
  }


  //change the value of title 
  const changeTicket = (e) => {
    if (e.target.name === "title") {
      selectedTicket.title = e.target.value
    } else if (e.target.name === "description") {
      selectedTicket.description = e.target.value
    } else if (e.target.name === "reporter") {
      selectedTicket.reporter = e.target.value
    } else if (e.target.name === "ticketPriority") {
      selectedTicket.ticketPriority = e.target.value
    } else if (e.target.name === "assignee") {
      selectedTicket.assignee = e.target.value
    }else if (e.target.name === "status") {
      selectedTicket.status = e.target.value
    }
    updateselectedTickets(Object.assign({}, selectedTicket))
  }


  const updateselectedTickets = (data) => {
    setselectedTicket(data)

  }


  //update tickets 
  const updateTicket = (e) => {
    e.preventDefault()
    setloading(true)
    updatefetchtickets(selectedTicket.id, selectedTicket)
      .then(response => {
        setloading(false)
        if (response.status === 200) {
          // console.log(response)
          setticketmodal(false)
          return toast(  "Ticket record has been updated successfully" ,{type:"success"} )
        }
      })
      .catch(error => {
        setloading(false)
        console.log(error)
        return toast(  " Oops Tickets record not updated successfully" ,{type:"error"} )
      })
  }


  // update cards 
  const updatecard = (tickets) => {
    const data = {
      pending: 0,
      open: 0,
      closed: 0,
      blocked: 0
    }
    tickets.forEach(item => {
      if (item.status === "IN_PROGRESS") {
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


      <ToastContainer position="top-center" autoClose="2000"/>
      <Sidebar state={showsidebar} />



      <Container className={showsidebar ? "active-contain" : "inactive-contain"} >




        <nav className="navbar m-4" style={{ backgroundColor: "rgb(255, 255, 255)", boxShadow: "0px 0px 25px 0.5px rgb(208, 206, 206)", borderRadius: "20px" }}>
          <div className="container-fluid ">
            <div>
              <h1 className="text-dark">Welcome admin</h1>
              <p style={{ opacity: "0.5" }}>Take a quick looks at your admin stats</p>
            </div>
            <BsLayoutSidebarInset className="toggle-icon  float-end my-5 mx-3" onClick={togglesidebar} />
          </div>

        </nav>



        <Container className="col-12 mb-5" >


          <Row className="mx-2" >


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



          <div style={{ marginLeft: "20px" }} className="mb-5" >
            <MaterialTable
              style={{ borderRadius: "10px", boxShadow: "0px 5px 25px 0.5px rgb(208, 206, 206)" }}
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


          {ticketmodal ? (<Modal show={ticketmodal} backdrop="static" onHide={closeticketmodal} centered >

            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <form >
                <h5 className="text-dark" style={{ opacity: "0.5" }}>Ticket ID :{selectedTicket.id}</h5>
                <hr />

                <div className="input-group mb-3 ">
                  <span className="input-group-text" style={{ paddingRight: "65px" }}>Title</span>
                  <input type="text" name="title" value={selectedTicket.title} onChange={changeTicket} className="form-control" />
                </div>


                <div className="input-group mb-3">
                  <span className="input-group-text " style={{ paddingRight: "12px" }}>Description</span>
                  <input type="text" name="description" value={selectedTicket.description} onChange={changeTicket} className="form-control" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text " style={{ paddingRight: "33px" }} >Reporter</span>
                  <input type="text" name="reporter" value={selectedTicket.reporter} onChange={changeTicket} className="form-control" />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text " style={{ paddingRight: "30px" }}>Assignee</span>
                  <input type="text" name="assignee" value={selectedTicket.assignee} onChange={changeTicket} className="form-control" />
                </div>


                <div className="input-group mb-3">
                  <span className="input-group-text ">Ticket Priority</span>
                  <input type="text" name="ticketPriority" value={selectedTicket.ticketPriority} onChange={changeTicket} className="form-control" />
                </div>


                <div className="input-group mb-3">
                  <span className="input-group-text  "style={{ paddingRight: "53px" }}>Status</span>
                  <select  name="status" value={selectedTicket.status} onChange={changeTicket}className="form-select">
                    <option >OPEN</option>
                    <option >CLOSED</option>
                    <option >IN_PROGRESS</option>
                    <option>BLOCKED</option>
                  </select>
                </div>

                <Button type="submit" variant="dark" onClick={updateTicket}>

                  {loading ? (
                    <Spinner style={{ width: '1rem', height: '1rem' }} />
                  ) : (<h6 className='my-1'>Update  </h6>)}


                </Button>

              </form>

            </Modal.Body>
          </Modal>) : ("")}



          <div style={{ marginLeft: "20px" }} className="mb-5 " >
            <MaterialTable
              style={{ borderRadius: "10px", boxShadow: "0px 5px 25px 0.5px rgb(208, 206, 206)" }}
              onRowClick={(e, rowData) => editallusers(rowData)}
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
                filtering: true,
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

          {usermodal ? (<Modal show={usermodal} backdrop="static" onHide={closeusermodal} centered >

            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <form >
                <h5 className="text-dark" style={{ opacity: "0.5" }}>User ID :{selectedUser.userId} </h5>
                <hr />

                <div className="input-group mb-3 ">
                  <span className="input-group-text" style={{ paddingRight: "65px" }}>Name</span>
                 <input type="text" /*onChange={changeUser}*/ value={selectedUser.name} name="name" className="form-control" /> 
                </div>

                <div className="input-group mb-3 ">
                  <span className="input-group-text" style={{ paddingRight: "65px" }}>Email</span>
                  <input type="email" /*onChange={changeUser}*/ value={selectedUser.email} name="email" className="form-control" />
                </div>
 
                <div className="input-group mb-3">
                  <span className="input-group-text " style={{ paddingRight: "70px" }}>Type</span>
                  <select name="type" /*onChange={changeUser}*/ value={selectedUser.userTypes} className="form-select">
                    <option >ADMIN</option>
                    <option >CUSTOMER</option>
                    <option >ENGINEER</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span  className="input-group-text " style={{ paddingRight: "60px" }}>Status</span>
                  <select name="status" onChange={changeUser} value={selectedUser.userStatus} className="form-select">
                    <option >APPROVED</option>
                    <option >PENDING</option>
                  </select>
                </div>


                <Button type="submit" variant="dark"  onClick={updateUser} >

                  {loading ? (
                    <Spinner style={{ width: '1rem', height: '1rem' }} />
                  ) : (<h6 className='my-1'>Update  </h6>)}


                </Button>

              </form>

            </Modal.Body>
          </Modal>) : ("")}
        </Container>


      </Container>




    </div>




  )
}

export default Admin