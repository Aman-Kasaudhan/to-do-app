import { useState,useEffect } from 'react'
import '../style/SignUp.css'
import { Resend } from 'resend';
import {toast} from 'react-toastify'
import axios from 'axios'
import Loader from "./Loader";
import { BASE_URL } from '../utils/api';
// import { useState } from "react";
import {useNavigate,Link} from 'react-router-dom'
function SignUp({setToken}){
    const [form ,setForm]=useState({})
    const [otp,setotp]=useState("")
    const [otpform ,setotpForm]=useState(false)
    const [genOtp, setgenOtp]=useState()
     const [timeLeft, setTimeLeft] = useState(0);
     const [otpId, setotpId] = useState("");
    const [loading,setLoading]=useState(false)

     const navigate=useNavigate();

        useEffect(() => {

    if(timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

    async function handleSendOtp(e){
         // console.log(BASE_URL)
      e.preventDefault();
      // const email=form.email
 console.log(email)
      if(!form.fullname){
        toast.warn("Enter full name")
        return;
      }

      else if(!email){
        toast.warn("Enter valid email")
        return;
      }
      else if(!form.password){
        toast.warn("Enter six digit password")
        return;
      }
      

     try{
        setLoading(true)
        const result=await axios.post(`${BASE_URL}/email-check`,{email})
     
        
        if(result.data.success){
        setLoading(false)
            
            toast.warn("Email already exists.")
            return;
        }
       
        

        const res=await axios.post(`${BASE_URL}/send-otp/`,{email})
        toast.success("Otp sent successfully")
        setotpForm(true)
        // setgenOtp(res.data.generatedOtp)
        setTimeLeft(120);
        setotpId(res.data.result.insertedId)

        setLoading(false)

    }
    catch(error){
        setLoading(false)

        toast.error("Failed to sent otp")
        return;
    }
 
    }

    async function handleSubmit(e) {
        
        e.preventDefault()
        if(!otp){
            toast.warn("Enter six digit otp")
            return;
        } 
        
        try{
        setLoading(true)

            const email=form.email
            const res=await axios.get(`${BASE_URL}/verify-otp/${email}`)
            let recotp
            if(res.data.success){
                
               recotp= res.data.result.otp
                if(recotp!=otp){
                    
                    toast.warn("Enter OTP not match")
                 setLoading(false)

                    return;
                    
                }
                // else if(genOtp==otp){
                 
                try{
       
                   
              const res=await axios.post(`${BASE_URL}/signup-form`,form)
                toast.success("SignUp successfully")
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token)
                navigate("/add-task")
        setLoading(false)

               }
               catch(error){
        setLoading(false)

                toast.warn("SignUp failed")
                return;
               }
                
            // }
        }

        else{
            toast.warn("Otp is expired. Resend again");
            return;
        }
        }
        catch(error){
        setLoading(false)

            return;
        }
        
    }
  async  function handleResend(e){
          e.preventDefault()
          setTimeLeft(120);
          try{
        setLoading(true)

              handleSendOtp(e)
        setLoading(false)

            //   toast.success("OTP sent successfully")

          }
          catch(error){
          setLoading(false)

            toast.error("Failed to resend otp")
            return;
          }
    }
    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
{loading && <Loader/>}
            <form>
                <label>Name:</label>
                <input type="text" name="fullname" required disabled={otpform}
                placeholder="Enter full name"
                onChange={(event)=>setForm({...form,fullname:event.target.value})}
                />

                <label>Email:</label>
                <input type="email" name="email" required  disabled={otpform}
                placeholder="Enter Email Id"
                onChange={(event)=>setForm({...form,email:event.target.value})}
                />

                <label>Password:</label>
                <input  type={!otpform ? "current-password" : "password"} name="password" required disabled={otpform}
                placeholder="Enter Password"
                onChange={(event)=>setForm({...form,password:event.target.value})}
                />

                { otpform &&
                <div className='otpTab'>

                    <input type="number" name="otp" required
                    placeholder="Enter six digit otp"
                    onChange={(event)=>setotp(event.target.value)}
                    />
                    <button onClick={handleResend} disabled={timeLeft > 0}
                         style={{
          
          cursor: timeLeft > 0 ? "not-allowed" : "pointer"
        }}
                        >
                        {
                        timeLeft > 0
                    ? `Resend OTP in ${timeLeft}s`
                    : "Resend OTP"
                  }
          </button>
                </div>
                }


            {otpform&&<button className='submit' onClick={handleSubmit}>Submit</button>}
            {!otpform &&<button className='submit' onClick={handleSendOtp}>Send OTP</button>}

            </form>

            <div className='loginText'>
                Already have an account? <Link to="/login">Login</Link>
            </div>



        </div>
    )


}

export default SignUp
