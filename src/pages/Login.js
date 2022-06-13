import {useState} from 'react'
import {Dropdown,DropdownButton} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {Container} from 'reactstrap'
import {Usersignin, Usersignup} from "../Api/auth"

function Login() {


    let navigate = useNavigate()


const [islogin,setlogin] = useState(true)    
const [user,setuser] = useState("CUSTOMER")


//sign up
const [signdata,setsigndata] = useState({})

//sign in/login
const [signInId,setsignInId] = useState('')
const [signInpassword,setsignInpassword] = useState('')


const [errormsg,seterrormsg] = useState('')


const handleSignin = (e)=>{

    e.preventDefault()
    if(signInId.trim().length === 0 || signInpassword.trim().length === 0){
          seterrormsg("Enter all details")
    }else{
   var data = {
        userId :signInId,
        password:signInpassword
    }

  Usersignin(data).then(function (response){
        //  console.log(response)
        if(response.status === 200){
             localStorage.setItem('username',response.data.name)
             localStorage.setItem('userId',response.data.userId)
             localStorage.setItem('userTypes',response.data.userTypes)
             localStorage.setItem('email',response.data.email)
             localStorage.setItem('token',response.data.accessToken) 
           if(response.data.userTypes === "CUSTOMER"){
              navigate("/Customer")
           }else if(response.data.userTypes === "ENGINEER"){
            navigate("/Engineer")
           }else{ 
            navigate("/Admin")
           }
        }
    }).catch(function(error){
            // console.log(error)
         if(error.response.status === 400){
             seterrormsg(error.response.data.message)
         }
    })
  }
}



const handleSignup = (e)=>{
      e.preventDefault()
    var data ={userType:user,...signdata}
    Usersignup(data).then(function (response){
        // console.log(response)
        if(response.status === 201){
            navigate(0);
        }
    }).catch(function(error){
        // console.log(error)
         if(error.response.status === 400){
             seterrormsg(error.response.data.message)
         }
    })
}



const updatesignindata = (e)=>{
  signdata[e.target.id] = e.target.value
  setsigndata(signdata)
}


const toggle = ()=>{
   setlogin(!islogin)
}


const selected =(e)=>{
    setuser(e)
}




return (
    <div>
  
   
    <Container className='col-6' >


       {islogin ? 

        (<div className='login-section'>
    
             
        <div className='bg-dark'>

           <img  src='https://cdn-icons-png.flaticon.com/512/3930/3930419.png' className='img-fluid mt-5 p-4' alt='logo'></img>
            <h3  className='text-center text-light'>Login Here</h3>

        </div>

        <div className='bg-light'>

               <form onSubmit={handleSignin}>
                   <div className='login-box mx-5 my-5 '>
                       <div>
                       <input onChange={(e)=>setsignInId(e.target.value)} type="text" placeholder='User ID' className='form-control my-4  input' ></input>
                       <input onChange={(e)=>setsignInpassword(e.target.value)} type="password" placeholder='password' className='form-control my-4 input' ></input>
                       <div className='text-center text-dark mb-3'>{errormsg}</div>
                       <button style={{width:"100%"}} type='submit' className='btn  btn-dark'>Login</button>
                       </div>

                     <p style={{cursor:"pointer"}} className='text-dark text-center mt-4' onClick={toggle}>New user? Signup</p>

                   </div>
                  
               </form>
               <div className='img-sec'>
               <img style={{width:"13rem"}}   src='https://cdn-icons-png.flaticon.com/512/86/86147.png' alt='logo'></img>
               </div>



        </div>


   </div>):(<div className='login-section'>
    
             
    <div className='bg-dark'>

       <img  src='https://cdn-icons-png.flaticon.com/512/3930/3930419.png' className='img-fluid mt-5 p-4' alt='logo'></img>
        <h3 className='text-center text-light'>Sign Up Here</h3>

    </div>

    <div className='bg-light'>

           <form onSubmit={handleSignup} >

               <div className='login-box mx-5 my-5 '>

                   <input onChange={updatesignindata}  id ="userId" type="text" placeholder='User ID' className='form-control my-4 input' ></input>
                   <input onChange={updatesignindata}  id ="name" type="text" placeholder='Username' className='form-control my-4 input' ></input>
                   <input onChange={updatesignindata}  id ="email" type="email" placeholder='Email' className='form-control my-4 input' ></input>
                   <input onChange={updatesignindata}  id ="password" type="password" placeholder='password' className='form-control my-2 input' ></input>


             <div className='select-box'>

                <p className='my-3 mx-4' style={{color:"grey"}}>User Type</p>

                   <DropdownButton align="start" title={user} variant="light" onSelect={selected}>
                        <Dropdown.Item eventKey="CUSTOMER" >CUSTOMER</Dropdown.Item>
                        <Dropdown.Item eventKey="ENGINEER" >ENGINEER</Dropdown.Item>
                   </DropdownButton>   

                   {/* <select className='selected' onChange={selected}>

                       <option value={"CUSTOMER"}>CUSTOMER</option>
                       <option value={"ENGINEER"}>ENGINEER</option>

                   </select>   */}

                </div>
                <div className='text-center text-dark mb-3'>{errormsg}</div>
                <button type='submit' style={{width:"100%"}} className='btn btn-dark'>Sign up</button>
                <p style={{cursor:"pointer"}}  onClick={toggle} className='text-dark text-center mt-4'>Already have an account? Login</p>

               </div>
          
           </form>

    </div>


</div>)}


    </Container>

   
  



    </div>
  )
}

export default Login