
import React, { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
function Edit()
{
    const history =useNavigate()
    const {id} =useParams()
const [taskData,setTaskData]=useState({
    _id: id,
    taskname:"",
    taskdescription:""
})
    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/tasks/getSingleTasks/${id}`);
          console.log(response.data.stask);
          setTaskData(response.data.stask)

        } catch (error) {
          console.log('Error fetching data:', error);
        }
      }

      const handleChange =(e)=>{
        const {name,value} = e.target
        setTaskData({...taskData,[name]:value})
      }

      const handleSubmit= async(e)=>{
        e.preventDefault();
          
        const fdata = new FormData();
        fdata.append('_id',taskData._id)
        fdata.append('taskname',taskData.taskname)
        fdata.append('taskdescription', taskData.taskdescription);
       
    
          
    
          try {
            const res = await axios.put('http://localhost:8000/api/v1/tasks/updateTasks', fdata, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log("updated tasks:",res.data)
            history("/home")
          } catch (err) {
            console.error(err);
          }
        }
    return(
        <div>
        <div className="d-flex justify-content-center">
          <div className="list-group mt-5">
          <input type="text" id="taskname" placeholder="Enter your task name" name="taskname" value={taskData.taskname} onChange={handleChange}/>
          <input type="text" id="taskdescription" placeholder="Enter your task description" name="taskdescription" value={taskData.taskdescription} onChange={handleChange}/>
          <button type="button" onClick={handleSubmit}>Add task</button>
          </div>
        </div>
          </div>
    )
}
export default Edit