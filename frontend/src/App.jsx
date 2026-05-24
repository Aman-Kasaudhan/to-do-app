import { Route, Routes,Navigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Navbar from './components/Navbar.jsx'
import AddList from './components/AddList.jsx'
import AllTask from './components/AllTask.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Setting from './components/Setting.jsx'
import Home from './components/Home.jsx'
import Loader from "./components/Loader.jsx";
import './style/App.css'
import {jwtDecode} from 'jwt-decode'
import { ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function App(){
  // const token=""
  const [token, setToken] = useState("");
   const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  // console.log(token);
  return(
<div>
  <ToastContainer />
 {loading && <Loader />}
 
  <Navbar />
  
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/add-task' element={token ?<AddList/>:<Login/>}/>
   <Route path='/all-task' element={token ?<AllTask/>:<Login/> }/> 
    <Route path='/sign-up' element={!token ?<SignUp setToken={setToken}/>:<AddList/>}/> 
    <Route path='/login' element={!token ?<Login setToken={setToken}/>:<AllTask/>}/>
    <Route path='/setting' element={token ?<Setting />:<Login/>}/>
    
  </Routes>
</div>

  )
}

export default App