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
import Tooltip from '@mui/material/Tooltip';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/material/CloseIcon';



const Register = () =>{
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // setEmail('asdasd');
  // setPassword('asjkdaskajsb');
  const request = { email, password };
  function submit(){
    console.log(JSON.stringify(request));
    // setEmail('asdasd');
    // setPassword('asjkdaskajsb');
    fetch('http://sefdb02.qut.edu.au:3001/user/register', {
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
        setMessage(data.message);
        console.log(data.message);
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
        <h1 className="text-white">Register</h1>
        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Tooltip title="Create User Name here" placement="right" arrow>
              <div>
                <Input
                  type="email"
                  onChange={getEmailValue}
                  placeholder="example@example.com"
                />
              </div>
            </Tooltip>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Tooltip title="Create Password here" placement="right" arrow>
              <div>
                <Input
                  type="password"
                  onChange={getPasswordValue}
                  placeholder="********"
                />                
              </div>
            </Tooltip>
          </FormGroup>
        <Button onClick={() => submit()}>Register</Button>
      </Form>
      </div>
    
        <Snackbar
          severity={severity}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />

    </div>
  );
}
export default Register;