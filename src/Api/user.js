import axios from "axios"

const BASE_URL = process.env.REACT_APP_SERVER_URL



export const fetchuser = async (userId) =>{
  return  await axios.get(`${BASE_URL}/crm/api/v1/users/${userId}`,{
    headers:{
        'x-access-token':localStorage.getItem("token")
    }

  }
)
    
}