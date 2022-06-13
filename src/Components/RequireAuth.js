import { Navigate,useLocation,Outlet } from "react-router-dom";



export const RequireAuth = ({Roles})=>{

 const location = useLocation()
 
  //  return (

  //   localStorage.getItem(("userTypes")) === Roles[0] ?  (<Outlet/>) :
  //   localStorage.getItem("userTypes") ? (<Navigate to="/unauthorised" state={{from:location}} replace />):
  //   (<Navigate to="/" state={{from:location}} replace />)
    
  //  )
   
   if(!localStorage.getItem("userTypes")){
    return   <Navigate to="/" state={{from:location}} replace />
   }
  
    
  if(localStorage.getItem("userTypes") !== Roles[0]) {
   return   <Navigate to="/unauthorized" state={{from:location}} replace />
  }
    
  
  return <Outlet/>     


}
