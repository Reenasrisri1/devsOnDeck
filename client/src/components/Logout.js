import React from 'react';
import { navigate } from '@reach/router';
import axios from "axios";

const Logout = () => {

  const logout = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/logout", { 
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

  return (
    <div>
        <button onClick={(e) => logout(e)}>Logout</button>
    </div>
  )
}

export default Logout;
