import React, { useContext } from 'react';
// import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {  Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Navigate } from 'react-router-dom';
import Login from "../pages/Login"
const Navbar= () =>{
  const [user, setUser] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("token");
  //   if (loggedInUser != null) {
  //     const foundUser = (loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, [user]);
  // const token = useContext(localStorage.getItem('token'));
let navigate = useNavigate();

  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('token')
  
      if (item != null) {
        setUser(item)
      }
    }
  
    window.addEventListener('token', checkUserData)
  
    return () => {
      window.removeEventListener('token', checkUserData)
    }
  }, [localStorage.getItem('token')])

  function logout(){
    if(localStorage.getItem("token") != null){
      localStorage.clear();
      setUser(false);
      setOpen(false);
      setMessage("Logged Out");
      setOpen(true);
      setUser(true);
      navigate('/login');
    }else{
      setOpen(false);
      setMessage("Currently Not Logged In");
      setOpen(true);
      setUser(false);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if(localStorage.getItem("token") == null){
    return (
      <header class="header">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
          <div class="container-fluid ">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/volcanolist">Volcano List</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/register">Register</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">Login</Link>
            </li>                 
          </ul>       
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <a class="btn btn-light" onClick={() => logout()}>Currently Not Logged In</a>
                </li>        		
              </ul>		  
            </div>
          </div>
        </nav>
        <Snackbar
          severity={severity}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      </header>
    );
  }else{
    return (
      <header class="header">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
          <div class="container-fluid ">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/volcanolist">Volcano List</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/register">Register</Link>
            </li>                
          </ul>       
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <a class="btn btn-light" onClick={() => logout()}>Log Out</a>
                </li>        		
              </ul>		  
            </div>
          </div>
        </nav>
        <Snackbar
          severity={severity}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      </header>
    );
  }
}
export default Navbar;