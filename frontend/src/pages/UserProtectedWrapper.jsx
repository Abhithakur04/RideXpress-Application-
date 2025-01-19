import React, {useEffect ,useState ,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectedWrapper = ({children}) => {
  const token=localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true)
  const {user,setUser}=useContext(UserDataContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers:{
             Authorization: `Bearer ${token}`
          }
      }).then(response =>{
          if(response.status===200){
              setUser(response.data)
              setIsLoading(false)
          }
      }).catch(err=>{
          localStorage.removeItem('token')
          navigate('/login')
      })
    },[token])
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper