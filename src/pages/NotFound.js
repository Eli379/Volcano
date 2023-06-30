import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Badge } from "reactstrap";

const NotFound = () => (
  <div className="container">
    <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh', position: 'sticky'}}>404 - Page does not Exist!</h1>
    <Link class="btn btn-primary" to="/">Go Home</Link>
  </div>
);

export default NotFound;