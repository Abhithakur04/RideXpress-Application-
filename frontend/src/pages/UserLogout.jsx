import React ,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token=localStorage.getItem('token')
      useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
       }).then((response)=>{
           if(response.status===201){
              localStorage.removeItem('token')
               navigate('/login')
             }
       })
        
      }, [token])
      
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout