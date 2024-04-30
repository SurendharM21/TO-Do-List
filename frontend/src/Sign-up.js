import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import { useState} from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/index";

function Signup() {

    const history =useNavigate()
    const dispatch= useDispatch()
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password:''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = new FormData();
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
      
        try {
          const res = await axios.post('http://localhost:8000/api/v1/users/register', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(res.data);
          sessionStorage.setItem("id", res.data.newUser._id);
          dispatch(authActions.login());
          dispatch(authActions.addUser(formData.email))
          history("/home")
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <div>
            <header>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">TO DO LIST APP</span>
                    </div>
                </nav>
            </header>
            <h1 className="display-6">Registration Form</h1>

            <div className="container">
        <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
                <div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Enter E-mail" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter Username" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} />
                    </div>
                   
                </div>
            </div>
        </div>
        <div className="text-center">
        <button type="submit" className="btn btn-primary float-right" onClick={handleSubmit}>Sign-up</button>
      <Link to="/">   <button type="submit" className="btn btn-primary float-right">Sign-in</button> </Link>
        </div>
    </div>


        </div>
    )
}
export default Signup