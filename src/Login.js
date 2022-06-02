import { useState } from 'react'
import { Dropdown,DropdownButton } from 'react-bootstrap'
import { Container } from 'reactstrap'

function Login() {

const [islogin,setlogin] = useState(false)    
const  [user,setuser] = useState("CUSTOMER")


const handlesubmit = (e)=>{
     e.prevent.Default()
    
}

const toggle = ()=>{
    setlogin(!islogin)
}

const selected =(e)=>{
setuser(e)
}


  return (
    <div >
  
   
    <Container className='col-6' >


       {islogin ? (<div className='login-section'>
    
             
             <div className='bg-primary'>

                <img  src='https://cdn-icons-png.flaticon.com/512/3930/3930419.png' className='img-fluid mt-5 p-4' alt='logo'></img>
                 <h3 className='text-center text-light'>Sign Up Here</h3>

             </div>

             <div className='bg-light'>

                    <form onSubmit={handlesubmit} >

                        <div className='login-box mx-5 my-5 '>

                            <input type="text" placeholder='User ID' className='form-control my-4 input' ></input>
                            <input type="text" placeholder='Username' className='form-control my-4 input' ></input>
                            <input type="email" placeholder='Email' className='form-control my-4 input' ></input>
                            <input type="password" placeholder='password' className='form-control my-2 input' ></input>


                         <div className='select-box'>

                         <p className='my-3 mx-4' style={{color:"grey"}}>User Type</p>

                            <DropdownButton align="start" title={user} variant="light" onSelect={selected}>
                                 <Dropdown.Item eventKey="CUSTOMER" >CUSTOMER</Dropdown.Item>
                                 <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                            </DropdownButton>   

                            {/* <select className='selected' onChange={selected}>

                                <option value={"CUSTOMER"}>CUSTOMER</option>
                                <option value={"ENGINEER"}>ENGINEER</option>
        
                            </select>   */}
 
       
        
                         </div>
                         <button type='submit' style={{width:"100%"}} className='btn btn-primary'>Sign up</button>
                         <p style={{cursor:"pointer"}}  onClick={toggle} className='text-primary text-center mt-4'>Already have an account? Login</p>
 
                        </div>
                   
                    </form>

             </div>
 

        </div>):

        (<div className='login-section'>
    
             
        <div className='bg-primary'>

           <img  src='https://cdn-icons-png.flaticon.com/512/3930/3930419.png' className='img-fluid mt-5 p-4' alt='logo'></img>
            <h3  className='text-center text-light'>Login Here</h3>

        </div>

        <div className='bg-light'>

               <form onSubmit={handlesubmit}>

                   <div className='login-box mx-5 my-5 '>
                       <div >
                       <input type="text" placeholder='User ID' className='form-control my-4  input' ></input>
                       <input type="password" placeholder='password' className='form-control my-4 input' ></input>
                       <button style={{width:"100%"}} type='submit' className='btn  btn-primary'>Login</button>
                       </div>


                    <p style={{cursor:"pointer"}} className='text-primary text-center mt-4' onClick={toggle}>New user? Signup</p>

                   </div>
                  
               </form>
               
               <div className='img-sec'>
               <img style={{width:"13rem"}}  src='https://cdn-icons-png.flaticon.com/512/86/86147.png' alt='logo'></img>
               </div>



        </div>


   </div>)}


    </Container>

   
  



    </div>
  )
}

export default Login