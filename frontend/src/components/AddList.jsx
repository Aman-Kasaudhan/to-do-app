import { useState } from 'react';
import '../style/AddList.css'
import {jwtDecode} from 'jwt-decode'
import { BASE_URL } from '../utils/api.js';
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader.jsx";
 
function AddList(){
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const id=jwtDecode(token).id
  
  const [loading, setLoading] = useState(false);
// localStorage.removeItem("token")
    const [taskData,settaskData]=useState();
 console.log(BASE_URL)
 async function handleSubmit(e){
     
     e.preventDefault()
    if(!taskData) return;
    
    try{
       setLoading(true)
          const res=await axios.post(`${BASE_URL}/add-task/${id}`,
          taskData)
       
        toast.success("Task added successfully")
        
        setLoading(false)
        setTimeout(()=>{
         
         navigate("/all-task")
      },1500);
     }
     catch(error){
        setLoading(false)
          
        //  console.log(error);
         toast.error("Task not added");
         return;
     }


} 
// if(!token) return;

    return (
       
            <div className="addtask-container">
            <h1>Add New Task</h1>
             {loading && <Loader />}
              <form>
                <label>Title:</label>
                <input type="text"
                name="title" 
                required
                placeholder="Enter Task name"
                onChange={(event)=>settaskData({...taskData,title:event.target.value})}
                />
               
                 <label>Description:</label>
                <textarea type="text"
                name="description"
                placeholder="Enter task Description"
               rows={4}
               
               onChange={(event)=>settaskData({...taskData,description:event.target.value})}/>
                 
                 <label>Date</label>
                <input type='date' name='date'
                onChange={(event)=>settaskData({...taskData,date:event.target.value})}/>
                  
                  <button className="submit" onClick={handleSubmit}>Submit</button>
              </form>
            
              </div>
           

    )
}
export default AddList
