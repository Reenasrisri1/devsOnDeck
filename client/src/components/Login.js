import React, { useState } from "react";
import axios from "axios";
import { navigate, Link } from '@reach/router';
import Navbar from './Navbar';
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = event => {
    event.preventDefault();
    console.log('Login!');
    axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    },
      {
        withCredentials: true
      })
      .then((res) => {
        console.log('Login successful!');
        console.log(res.data);
        if (window.location.pathname === '/devs/login') {
          navigate(`/devs/dashboard`);
        } else if (window.location.pathname === '/orgs/login') {
          navigate(`/orgs/dashboard`);
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err.response.data.msg);
      });
  };

  let welcomeUser;
  if (window.location.pathname === '/devs/login') {
    welcomeUser = <div>
      <h3 className='text-capitalize text-center'>Welcome Back, Developer!</h3>
      <h5 className='text-capitalize text-center'>Let's Connect you to a Job!</h5>
    </div>
  } else if (window.location.pathname === '/orgs/login') {
    welcomeUser = <div>
      <h3 className='text-capitalize text-center'>Welcome Back!</h3>
      <h5 className='text-capitalize text-center'>Let's Find you some candidates!</h5>
    </div>
  }
  return (
    <div>
      <Navbar devRegister='Dev Registration' orgRegister='Org Registration' />
      <div className='w-50 mx-auto pt-2'>
        {welcomeUser}
        {/* <p className="error-text">{errorMessage ? errorMessage : ""}</p> */}
        <form onSubmit={login} className="needs-validation" novalidate>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="valid-feedback">Valid.</div>
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
            <button type="submit" className="btn btn-success btn-sm mb-1">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
