import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import '../style/AllTask.css'
import {jwtDecode} from 'jwt-decode'
import Loader from "./Loader.jsx";
import { BASE_URL } from "../utils/api.js";
function AllTask(){
    // const [i,setId]=useState();
    
        const [loading, setLoading] = useState(false);
        
        const [allData,setallData]=useState([]);
        
        const token=localStorage.getItem("token")
        const id=jwtDecode(token).id
        
        useEffect(()=>{
            
            // if(token) 
            setLoading(true)
            dataFetch();
            setLoading(false)
            
        },[token])
        // console.log(id)
        
        async function dataFetch(){
            
            try{
                // setLoading(true)
                const result=await axios.get(`${BASE_URL}/all-task/${id}`)
                // console.log(result)
                setallData(result.data.result)
                
                if(result.data.result.length>0){
                    toast.success("All task fetch successfully")
                    setLoading(false)
                    
                }
                else {
                    toast.info("No task found")
                    setLoading(false)
                    return;
                }
                setLoading(false)
        
    }
    catch(error){
            setLoading(false)

        toast.error("Unable to fetch all task");
        return;
    }
}

 async function handleDelete( id){
    // console.log(id)
    try{
            setLoading(true)

        const result =await axios.delete(`${BASE_URL}/delete-task/${id}`)
        toast.success("Item Deleted Successfully")
        setTimeout(()=>{
            dataFetch();
        },1500)
            setLoading(false)

    }
    catch(error){
            setLoading(false)

        toast.error("Server error")
        return;
    }

}

     const [checkedall,setchecked]=useState([])

       function allChecked(e){
        if(e.target.checked){
           let items= allData.map((item)=>item._id)
            setchecked(items)
        }
        else {
            setchecked([])
        }
         
     }

       function singleChecked(id){
        //    console.log(id)
        if(checkedall.includes(id)){

            let items=checkedall.filter((item)=>item!=id);
            setchecked(items);
        }
        else{
            setchecked([id,...checkedall])
        }
     }

     async function deleteChecked(){
        //    allChecked()
            // console.log(checkedall)
        if(checkedall.length==0){

            toast.error("No item checked for delete") 
            return;
        }
       
         try{
            setLoading(true)

            const result=await axios.post(`${BASE_URL}/delete-checked`,{checkedall})
            toast.success("Checked Item Deleted Successfully")
            setTimeout(()=>{
            dataFetch();
                

            },1500)
            setLoading(false)

         }
         catch(error){
            setLoading(false)

             toast.error("Server error")
        return;
         }

     }



    return(
        <div className="alltask-container">
            {loading && <Loader/>}
            <h1>To Do List</h1>
           {allData.length>0&& <button className="checkDelete" onClick={deleteChecked}>Delete</button>}
            {
                allData.length == 0 && (
      <div className="no-task">
         No tasks available yet. Create a new task to get started.
      </div>
   )
}
            {allData.length>0 &&<div className="task-heading">
            <input type="checkbox" className="list-header" onClick={allChecked}/>
            <p className="l
            ist-header">S.No</p>
            <p className="list-header">Task Title</p>
            <p className="list-header">Task Description</p>
            <p className="list-header">Date</p>
            <p className="list-header" >Action</p>
            </div>}

            { allData && allData.map((item,index)=>(
                <div className="task-row" key={item._id}>  
            <input type="checkbox" className="list-item" onClick={()=>singleChecked(item._id)} checked={checkedall.includes(item._id)}/>

                    <p className="list-item">{index+1}</p>
                    <p className="list-item">{item.title}</p>
                    <p className="list-item">{item.description}</p>
                    <p className="list-item">{item.date}</p>
                     <button className="deleteButton" onClick={()=>handleDelete(item._id)}>Delete</button>
                </div>


            ))

            }


       
        </div>
    )
}

export default AllTask