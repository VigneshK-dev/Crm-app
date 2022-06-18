import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Route,Routes } from 'react-router-dom';
import { RequireAuth } from './Components/RequireAuth';
import Errorcomp from './Components/Errorcomp';





const Login = React.lazy(()=>import("./pages/Login"))
const Customer = React.lazy(()=>import('./pages/Customer/Customer'))
const Engineer = React.lazy(()=>import('./pages/Engineer/Engineer'))
const Admin = React.lazy(()=>import("./pages/Admin/Admin"))

function App() {


  const Roles = {
    CUSTOMER:"CUSTOMER",
    ENGINEER:"ENGINEER",
     ADMIN:"ADMIN"
  }
  

 const pagetype ={
   UNAUTHORIZED:"UNAUTHORIZED",
   NOTFOUND:"NOTFOUND"
 } 


  return (
    <div>

 <Suspense fallback={<div className ="d-flex text-dark justify-content-center ">
                       <Spinner style={{width: '3rem', height: '3rem'}}/>
                     </div>}>

<Routes>
   <Route exact  path='/' element={<Login/>} />


  <Route element={<RequireAuth Roles = {[Roles.ADMIN]} />} > 
      <Route exact path='/Admin' element={<Admin/>} />
  </Route>

  <Route element={<RequireAuth Roles = {[Roles.ENGINEER]} />} > 
      <Route exact path='/Engineer' element={<Engineer/>} />
  </Route>

  <Route element={<RequireAuth Roles = {[Roles.CUSTOMER]} />} > 
      <Route exact  path='/Customer' element={<Customer/>} />
  </Route>


<Route  path="/unauthorized" element={<Errorcomp pagetype ={pagetype.UNAUTHORIZED}/>} />

<Route  path= '/*'  element = {<Errorcomp pagetype = {pagetype.NOTFOUND}/>} />
   

</Routes>


</Suspense>






     
    </div>
  );
}

export default App;
