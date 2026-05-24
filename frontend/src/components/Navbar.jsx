import { NavLink, useNavigate } from "react-router-dom";
import '../style/Navbar.css'
import logo from "../assets/logo.png"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
function Navbar(){
const navigate=useNavigate()
const [name,setName]=useState("A")
    function handlehome(){
          navigate("/")
    }
    function handSetting(){
        
          navigate("/setting")
    }
    
    const token = localStorage.getItem("token");
    let id
      if(token)
         id=jwtDecode(token).id
        useEffect(()=>{
            profile()
        },[])
        async function profile(){
            try{
                const result=await axios.get(`${BASE_URL}/all-task/${id}`)
               setName(result.data.user.fullname)
            }
            catch(error){
               console.log(error)
            }
        }
    return(
        <nav className="navbar-container">
            <div className="leftItem">
                <img src={logo} alt='logo' className="logo-img" onClick={handlehome}></img>
                <h2>To Do List</h2>
            </div>
            <div className="rightItem">
                {token &&
                <div className="nav-link">
                    <NavLink to="/all-task" className="link1">View Tasks</NavLink>
                    <NavLink to="/add-task" className="link1">Add Task</NavLink>
                    <img 
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}
                     alt='logo' className="logo-img" onClick={handSetting}></img>

                </div>
                }

                {!token &&
                <div className="nav-link">
                    <NavLink to="/sign-up" className="link1">SignUp</NavLink>
                    <NavLink to="/login" className="link1">Login</NavLink>
                </div>
                }

            </div>
        </nav>
    )
}

export default Navbar