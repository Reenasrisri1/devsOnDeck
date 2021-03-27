import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import Navbar from './Navbar';

const Register = props => {

  const [state, setState] = useState({
    isOrg: false,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  const [errs, setErrs] = useState({});

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    let navigateUrl = `/devs/skills/languages`;
    let registerObj = {...state}
    if (window.location.pathname === '/orgs/register') {
      navigateUrl = `/orgs/dashboard`;
      registerObj.isOrg = true;
    }
    axios
      .post('http://localhost:8000/api/register', registerObj, {withCredentials: true})

      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrs(res.data.errors);
        } else {
          console.log(res.data._id);
          navigate(navigateUrl);
        }
      })
      .catch((err) => console.log(err));
  };//end submitForm
  
  let userForm;
  let orgname = <div className="form-group">
    <label htmlFor="orgName">Org Name</label>
    <input type="text" className="form-control" id="orgName" placeholder="Enter Org Name" name="orgName" onChange={(e) => onChange(e)} required />
    <div className="valid-feedback">Valid.</div>
    <div className="invalid-feedback">Please fill out this field.</div>
  </div>
  //---------------------
  if (window.location.pathname === '/devs/register') {
    userForm = <div className='w-50 mx-auto pt-2'>
      <h3 className='text-capitalize text-center'>Developer Sign up</h3>
      <form onSubmit={submitForm} action="/action_page.php" className="needs-validation" novalidate>
        <div className="form-group">
          <label for="firstName">First Name</label>
          <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" name="firstName" onChange={(e) => onChange(e)} required />
          {errs.firstName ? (
            <span className='text-danger'>{errs.firstName.message}</span>
          ) : null}
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="lastName">Last Name</label>
          <input type="lastName" className="form-control" id="lastName" placeholder="Enter Last Name" name="lastName" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="address">Address</label>
          <input type="address" className="form-control" id="address" placeholder="Enter Address" name="address" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="city">City</label>
          <input type="city" className="form-control" id="city" placeholder="Enter City" name="city" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="state">State</label>
          <input type="state" className="form-control" id="state" placeholder="Enter State" name="state" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="city" placeholder="Enter password" name="password" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="confirmPassword">Confirm</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="submit" className="btn btn-success btn-sm mb-1 ">Register</button>
      </form>
      <p className='text-center'>
        <Link to={`/orgs/register`}>Need to Sign up an Organisation?</Link>
      </p>
    </div>
  } else if (window.location.pathname === '/orgs/register') {
    userForm = <div className='w-50 mx-auto pt-2'>
      <h3 className='text-capitalize text-center'>Organisation Sign up</h3>
      <form onSubmit={submitForm} action="/action_page.php" className="needs-validation" novalidate>
        {orgname}
        <div className="form-group">
          <label for="firstName">First Name</label>
          <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" name="firstName" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="lastName">Last Name</label>
          <input type="lastName" className="form-control" id="lastName" placeholder="Enter Last Name" name="lastName" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="address">Address</label>
          <input type="address" className="form-control" id="address" placeholder="Enter Address" name="address" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="city">City</label>
          <input type="city" className="form-control" id="city" placeholder="Enter City" name="city" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="state">State</label>
          <input type="state" className="form-control" id="state" placeholder="Enter State" name="state" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="city" placeholder="Enter password" name="password" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="confirmPassword">Confirm</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="submit" className="btn btn-success btn-sm mb-1">Register</button>
      </form>
      <p className='text-center'>
        <Link to={`/devs/register`}>Need to Sign up as a Developer?</Link>
      </p>
    </div>
  }

  return (
    <div>
      <Navbar devLogin='Dev Login' orgLogin='Org Login' />
      {userForm}
    </div>
  );
}

export default Register;