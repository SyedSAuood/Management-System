import './App.css'
import LoginPage from './Login/LoginPage'
import { BrowserRouter , Route , Routes ,Navigate } from 'react-router-dom'
import Signup from './Login/Signup'
import Home from './Component/Home'
import { useStateContext } from './CustomHook/ContextProvider'
import Unauthorized from './Login/Unauthorized'

function App() {

  const { userRole} = useStateContext();
console.log(userRole);
  return (
    <BrowserRouter>
       
        <div>
          <Routes>
            
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signin' element={<Signup/>}/>
          
        
            {/* Protected Route */}
            {
              userRole === "User" || userRole === "Admin"?(
              
                <Route path='/Home' element={<Home/>}/>
                
              ):(
                <Route path='/unauthorized' element={<Unauthorized/>}/>
              ) 
            }
            {/* Fallback Route */}
            <Route path='*' element={<Navigate to='/unauthorized' />} />

          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
