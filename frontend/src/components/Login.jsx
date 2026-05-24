import { useState } from "react";
import axios from "axios";
import '../style/Login.css'
import { toast } from "react-toastify";
import { useNavigate ,Link} from "react-router-dom";
import Loader from "./Loader";
import { BASE_URL } from "../utils/api";
function Login({ setToken }) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading]=useState(false)
const navigate=useNavigate()
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
            setLoading(true)

        const email =formData.email
        const result=await axios.post(`${BASE_URL}/email-check`,{email})
     
        
        if(!result.data.success){
          setLoading(false)
            toast.warn("Email not found .Please Signup")
            return;
        }
setLoading(false)
      const res = await axios.post(`${BASE_URL}/login`,formData);
      
      // save token
      if(res.data.success){
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token)
          toast.success("Login Successful");
          setTimeout(()=>{
            navigate("/all-task")

          },1000)
      }

      else{
          toast.warn("Enter correct password");
            setLoading(false)
          
           return;
      }
            setLoading(false)

    } catch (error) {
      // console.log(error);
            setLoading(false)

      toast.warn("Login Failed");
      return
    }
  }

  return (
    <div className="login-container">
{loading && <Loader/>}
      <form onSubmit={handleSubmit}>

        <h2>Login Form</h2>
         <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />
          <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

         <div className='loginText'>
               Not have an account? <Link to="/sign-up">SignUp</Link>
            </div>

      </form>

    </div>
  );
}

export default Login;