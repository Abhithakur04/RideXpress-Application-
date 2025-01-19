import React ,{useState,useContext} from 'react'
import uberlogo from "../assets/img/uberlogo.png"
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
  const [email, setEmail] = useState('Akshay@gmail.com');
  const [password, setPassword] = useState('Akshay123');
  const [userData, setuserData] = useState({});
  

  const {user,setUser}=useContext(UserDataContext)
  const navigate=useNavigate()


  const submitHandler=async(e)=>{
    e.preventDefault();

    const userData={
      email:email,
      password:password
    }
     const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData);
     if(response.status===200){
       const data=response.data
       setUser(data.user)
       localStorage.setItem('token',data.token)
       navigate('/home')
     }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
         
         <div>
         <img className='w-16 mb-10' src={uberlogo} alt="" />
         <form onSubmit={(e)=>{
           submitHandler(e)
         }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
         required value={email}
         onChange={(e)=>{
           setEmail(e.target.value)
         }}
         className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
        type="email" 
        placeholder="email@gmail.com"/>
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input required 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
         type="password"
          placeholder="password"/>
         <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg">Login</button>
          <p className="text-center">New here?<Link to="/signup" className="text-blue-600"> Create new Account</Link></p>
      </form>
         </div>
         <div>
           <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-9 rounded px-4 py-2  w-full text-lg">Sign in as Captain</Link>
         </div>
    </div>
  )
}

export default UserLogin