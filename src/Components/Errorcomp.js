import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import notfound from "../assets/404.svg"
import unauth from "../assets/403.svg"

function Errorcomp({pagetype}) {


    let navigate = useNavigate()

    const goback = ()=>{
       navigate(-1)
    }

  return (
    <div>

<Container className='col-8' >
    {pagetype === "UNAUTHORIZED" ?   

   (
    <div className='not-sec'>
     <h4 className='text-center text-dark'>Unauthorized Access</h4>
    <img style={{width:"20rem",height:"20rem"}}  className='img-fluid  p-5' src={unauth} alt="403" ></img>
    <p className='text-center text-dark'>you do not have access to the requested page</p>
    <button className='btn btn-dark'onClick={goback} >Go Back</button>
    </div>
   ) : (
    <div className='not-sec'>
    <h4 className='text-center text-dark'>Hmm. This doesn't seem right </h4>
    <p className='text-center text-dark'>This page doesn't exist</p>
    <img style={{width:"100%",height:"18rem"}}  className='img-fluid  p-5' src={notfound} alt="404" ></img>
    <button className='btn btn-dark'onClick={goback}>Go Back</button>
    </div>
     )}


</Container>


    




    </div>
  )
}

export default Errorcomp