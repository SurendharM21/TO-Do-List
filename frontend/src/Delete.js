import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
function Delete()
{
    const {id} =useParams()
    const emailuser =useSelector((state)=>state.user)
    const history=useNavigate()
    
    const [deleteData,setDeleteData] = useState({
        email:emailuser,
    })
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData= async(e)=>{
          try {
            const res = await axios.delete(`http://localhost:8000/api/v1/tasks/deleteTasks/${id}`, deleteData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            history("/home")    
          } catch (err) {
            console.error(err);
          }
        
      }
    
    return(
        <div>
            <p>Deleted successfully</p>
        </div>
    )
}

export default Delete