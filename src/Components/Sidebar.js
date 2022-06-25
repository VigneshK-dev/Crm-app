import React from 'react'
import { DiJqueryLogo } from 'react-icons/di';
import {FiShoppingBag} from 'react-icons/fi';
import {FiShoppingCart} from 'react-icons/fi';
import {TbLogout} from 'react-icons/tb';
import {AiOutlineUserAdd} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


function Sidebar({state}) {

  const navigate = useNavigate()

const logout =()=>{
   localStorage.clear()
    navigate("/")
   
}


  return (

     
<div className= {state ? "sidebar-open " : "sidebar-close  "}>

<div className='side-box my-3'> 


<div className='mx-5 side-brand mb-5'>
 <DiJqueryLogo style={{fontSize:"25px"}}  className=' mx-2'/>
<h5 className='my-1 mx-2 '>Shoppy</h5>
</div>


  <div className='mx-5'>
   <h6  style={{opacity:"0.5"}}>DASHBOARD</h6>
  <div className= {state ?  "side-nav  mb-3 " :"sidebar-close-icons mb-3"} >
      <div className='sideicon mx-2 my-2'>
       <FiShoppingBag />
      </div>
     <h6 className='side-title my-2 mx-2 mb-1'>Ecommerce</h6>
  </div>
  </div>

 
  <div className='mx-5'>
   <h6  style={{opacity:"0.5"}}>PAGES</h6>

   <div className= {state ?  "side-nav  mb-3 " :"sidebar-close-icons mb-3"} >
      <div className='sideicon mx-2 my-2'>
       <FiShoppingCart/>
      </div>
     <h6 className='side-title mx-2 my-2 mb-1'>Orders</h6>
  </div>

  <div className= {state ?  "side-nav  mb-3 " :"sidebar-close-icons mb-3"} >
      <div className='sideicon mx-2 my-2'>
       <AiOutlineUserAdd />
      </div>
     <h6 className='side-title mx-2 my-2 mb-1'>Employees</h6>
  </div>

  <div onClick={logout} className= {state ?  "side-nav  mb-3 " :"sidebar-close-icons mb-3"} >
      <div className='sideicon mx-2 my-2'>
       <TbLogout  fontSize="22px"/>
      </div>
     <h6 className='side-title mx-2 my-2 mb-1' >Logout</h6>
  </div>

  </div>

   
         

        
</div>

 
</div>




  )
}

export default Sidebar