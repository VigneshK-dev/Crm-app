import "./Admin.css"
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '../../Components/Sidebar'
import { BsLayoutSidebarInset,BsLightningCharge } from 'react-icons/bs';
import { TbArrowUpRightCircle} from 'react-icons/tb';
import { ImBlocked} from 'react-icons/im';
import { BiPencil } from 'react-icons/bi';
import { useState } from 'react';
import { CardBody, Col, Row, Card, Container } from "reactstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";




function Admin() {

  const [showsidebar, setsidebar] = useState(true)


  const togglesidebar = () => {
    setsidebar(!showsidebar)
    console.log("clicked")
  }



  const Cards = [
    {
    icon:<BiPencil className="card-icon"/>,
    title:"Open",
    color:  "rgb(95, 201, 253)",
    pathcolor:"rgb(1, 107, 235)"
    },
    {
      icon:<BsLightningCharge className="card-icon"/>,
      title:"Progress",
      color:  "rgb(88, 230, 152)",
      pathcolor:"rgb(8, 152, 3)"
      },
      {
        icon:<TbArrowUpRightCircle className="card-icon"/>,
        title:"Closed",
        color:  "rgb(253, 206, 125)",
        pathcolor:"rgb(196, 129, 13)"
        },
        {
          icon:<ImBlocked className="card-icon"/>,
          title:"Blocked",
          color:  "rgb(253, 158, 114)",
          pathcolor:"rgb(201, 80, 24)"
         },
]




  return (



    <div>




      <Sidebar state={showsidebar} />

      <BsLayoutSidebarInset className="toggle-icon float-end my-2 mx-3" onClick={togglesidebar} />


      <Container className={showsidebar ? "active-contain" : "inactive-contain"} >



        <div className="mb-5 mx-2">
          <h1 className="text-dark">Welcome admin</h1>
          <p style={{ opacity: "0.5" }}>Take a quick looks at your admin stats</p>
        </div>


        <Container className="col-12 ">
          

          <Row>

         
            {Cards.map((ele,index)=>( 
            <Col key={index} className="col-lg-3  my-2  col-md-4 col-sm-6 ">

              <Card style={{background:ele.color}} className="cards">

                <CardBody>

                  <div className="card-box bg-light">
                    {ele.icon}
                    <h5 className="text-dark my-1 mx-2">{ele.title}</h5>
                  </div>


                  <div className="circle">

                    <h4>80</h4>
                    <div className="float-end my-4" style={{ width: "70px", height: "70px" }}>
                      <CircularProgressbar strokeWidth={12} value={50} styles={buildStyles({
                         pathColor:ele.pathcolor

                      })} />
                    </div>

                  </div>


                </CardBody>


              </Card>

            </Col>))}

          </Row>

        </Container>






      



    </Container>






    </div>




  )
}

export default Admin