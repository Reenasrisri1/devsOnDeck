import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { navigate, Link } from '@reach/router';

const Navbar = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const logout = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/api/logout", {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          navigate("/devs/login");
        })
        .catch(err => {
          console.log(err);
        });
    };

  let navigationlink;
  if (window.location.pathname === '/devs/register' || window.location.pathname === '/orgs/register') {
    navigationlink = <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <Link className="nav-link" to={`/devs/login`}>{props.devLogin}</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to={`/orgs/login`}>{props.orgLogin}</Link>
      </li>
    </ul>
  } else if (window.location.pathname === '/devs/login' || window.location.pathname === '/orgs/login') {
    navigationlink = <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
       <Link className="nav-link" to={`/devs/register`}>{props.devRegister}</Link>
      </li>
      <li className="nav-item active">
       <Link className="nav-link" to={`/orgs/register`}>{props.orgRegister}</Link>
      </li>
    </ul>
  } else {
    navigationlink = <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a className="nav-link" onClick={(e) => logout(e)}>Logout</a>
      </li>

    </ul>
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to={`/devs/register`}>DevsOnDeck</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {navigationlink}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;