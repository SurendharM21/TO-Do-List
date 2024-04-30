import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';
import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Login from './Login';
import Signup from './Sign-up';
import Home from './Home';
import Edit from './Edit'
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import Delete from './Delete';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/home" element={<Home></Home>} />
          <Route path="/edit/:id" element={<Edit></Edit>}></Route>
          <Route path="/delete/:id" element={<Delete></Delete>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
