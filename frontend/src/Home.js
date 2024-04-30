import React from "react";
import "./index.css"
import "./Home.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";
import axios from "axios"
import {Link, useNavigate } from "react-router-dom";

function Home() {
  const [formData, setFormData] = useState({
    taskname:"",
    taskdescription:""
  });
  const [taskModel, setTaskModel] = useState(false)
  const [taskFormData, setTaskFormData] = useState({
    taskname :"",
    taskdescription :""
  });

  useEffect(() => {
    fetchData();
  }, []);
 
 

  const id = sessionStorage.getItem("id")

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/tasks/getAllTasks/${id}`);
      console.log(response.data.taskAll);
      setFormData(response.data.taskAll)
      console.log(typeof(formData))
     

      console.log("FormData after setting:", formData);

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }



  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const emailuser =useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    history("/");
  }

  const handleChange =(e)=>{
    const {name,value} = e.target
    setTaskFormData({...taskFormData,[name]:value})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
      
    const fdata = new FormData();
    fdata.append('email',emailuser)
    fdata.append('taskname', taskFormData.taskname);
    fdata.append('taskdescription', taskFormData.taskdescription);

      

      try {
        const res = await axios.post('http://localhost:8000/api/v1/tasks/createTasks', fdata, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setTaskModel(false)
        console.log(res.data);
        fetchData()
        
      } catch (err) {
        console.error(err);
      }
    
  }


  return (
    <div>
      <header>
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <h1>To Do List </h1>
            {isLoggedIn && (<form class="d-flex" role="search">
              <button class="btn btn-outline-success" type="submit" onClick={logout}>Logout</button>
            </form>)}
          </div>
        </nav>
      </header>
      {
        Object.values(formData).map((task) => (
          <div>
            <div className="d-flex justify-content-center">
              <div className="list-group mt-5">
                <a href="#" className="list-group-item list-group-item-action ">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{task.taskname}</h5>
                  </div>
                  <p className="mb-1">{task.taskdescription}</p>
                </a>
              </div>
              <div className="btnsw">
          <Link to={`/edit/${task._id}`} className="btn btn-outline-primary">Update</Link> 
          <Link to={`/delete/${task._id}`} className="btn btn-outline-primary">Delete</Link> 
              </div>
            </div>
          </div>
        ))

      }
      {
        taskModel && (
        <div className="d-flex justify-content-center">
          <div className="list-group mt-5">
          <input type="text" id="taskname" placeholder="Enter your task name" name="taskname" onChange={handleChange} />
          <input type="text" id="taskdescription" placeholder="Enter your task description" name="taskdescription" onChange={handleChange} />
          <button type="button" onClick={handleSubmit} >Add task</button>
          </div>
        </div>
        )
      }
      <div className="text-center mt-4">
        <button type="button" className="btn btn-primary" onClick={() => (setTaskModel(true))}>Add Task</button>
        
      </div>
    </div>
  )
}
export default Home