import React, {useState} from 'react';
import { Component } from 'react';
import {
  Toast,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  let navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // setEmail('asdasd');
  // setPassword('asjkdaskajsb');
  const request = { email, password };
  function submit(){
    console.log(JSON.stringify(request));
    // setEmail('asdasd');
    // setPassword('asjkdaskajsb');
    fetch('http://sefdb02.qut.edu.au:3001/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
      if(data.error == true){
        setOpen(false);
        setMessage(data.message);
        setOpen(true);
      }else{
        console.log(data.token);
        setMessage('Successfully Logged In');
        setOpen(true); 
        // if(localStorage.getItem('token') == data.token){
        //   setMessage('You are already logged in as this user');
        // }else{
          setTimeout( () =>{
            console.log('timer done')
            navigate('/');
            window.location.reload(false); 
            localStorage.setItem('token', data.token);
        }, 1000);        
        // }
      };
    })
    setOpen(true);
    
  }
  
  const getEmailValue = (e) =>{
    // handleClick('Message A');
    setEmail(e.target.value);
    console.log(e.target.value);  
  }
  const getPasswordValue = (e) =>{
    setPassword(e.target.value);
    console.log(e.target.value);
  }   
  return (
    <div className="container text-center w-50">
      <div className="p-5 mt-5 bg-dark rounded">
        <h1 className="text-white">Log In</h1>
        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input
              type="email"
              onChange={getEmailValue}
              placeholder="example@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              onChange={getPasswordValue}
              placeholder="********"
            />
          </FormGroup>
        <Button onClick={() => submit()}>Log In</Button>
      </Form>
      </div>
    
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />

    </div>
  );
}
export default Login;