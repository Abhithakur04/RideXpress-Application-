import React ,{useContext} from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import 'remixicon/fonts/remixicon.css'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'



const App = () => {
  

  return (
    <div>
      <Routes>
     
         <Route path='/' element={<Start/>}/>  
        <Route path='/login'element={<UserLogin/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-riding' element={<CaptainRiding/>} />

        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login'element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
        <Route path='/home' element={
            <UserProtectedWrapper>
           <Home/>
           </UserProtectedWrapper>
          
     
        }/>
        <Route path='/user/logout' element={
           <UserProtectedWrapper>
             <UserLogout/>
            </UserProtectedWrapper>
        }/>
        <Route  path='/captain-home' element={
            <CaptainProtectedWrapper>
                 <CaptainHome/>
            </CaptainProtectedWrapper>
           
        }    
        />
        <Route path='/captain/logout' element={
           <CaptainProtectedWrapper>
                <UserLogout/>
        </CaptainProtectedWrapper>
   
        }
        />
       

      </Routes>
    </div>
  )
}

export default App