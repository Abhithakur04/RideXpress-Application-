import React, { children,useEffect ,useState ,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({children}) => {
    const token=localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)
    const {captain, setCaptain}=useContext(CaptainDataContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }
        //captain token matches with captain token not user token 
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers:{
                Authorization:`Bearer $(token)`
            }
        }).then(response =>{
            if(response.status===200){
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch(err=>{
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    },[token])

  
    if(isLoading){
        return  (
            <div>Loading...</div>
        )
    }

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectedWrapper