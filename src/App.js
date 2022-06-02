import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Route,Routes } from 'react-router-dom';



const Login = React.lazy(()=>import("./Login"))

function App() {

  


  return (
    <div>

 <Suspense fallback={<div className ="d-flex text-dark justify-content-center ">
                       <Spinner style={{width: '3rem', height: '3rem'}}/>
                     </div>}>

 <Routes>
   <Route path='/' element={<Login/>} />
 </Routes>


 </Suspense>




     
    </div>
  );
}

export default App;
