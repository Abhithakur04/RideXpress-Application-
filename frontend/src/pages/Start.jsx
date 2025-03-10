import React from 'react'
import uberlogo from "../assets/img/uberlogo.png"
import uberbackground from "../assets/img/uberbackgrnound.jpg"
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className=' h-screen pt-8 flex justify-between flex-col w-full bg-red-400'
         style={{backgroundImage:`url(${uberbackground})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                height:'100vh',
                width:'100%'}}>
           <img className='w-16 ml-8' src={uberlogo} alt="" />
            <div className='bg-white pb-7 py-5 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            
            </div>
        </div>
    </div>
  )
}

export default Start