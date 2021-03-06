import axios from "axios"

const BASE_URL = process.env.REACT_APP_SERVER_URL



export const fetchtickets = async () =>{
  return  await axios.get(`${BASE_URL}/crm/api/v1/tickets`,{
    headers:{
        'x-access-token':localStorage.getItem("token")
    }

  },{
      "userId":localStorage.getItem("userId")
  }
  )

    
}


export const updatefetchtickets = async (id,data) =>{
  return  await axios.put(`${BASE_URL}/crm/api/v1/tickets/${id}`,data,{
    headers:{
        'x-access-token':localStorage.getItem("token")
    }

  },{
      "userId":localStorage.getItem("userId")
  }
  )    
}