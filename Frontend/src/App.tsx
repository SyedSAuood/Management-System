import './App.css'
import LoginPage from './Login/LoginPage'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Signup from './Login/Signup'

function App() {


  return (
    <BrowserRouter>
       
        <div>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signin' element={<Signup/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
