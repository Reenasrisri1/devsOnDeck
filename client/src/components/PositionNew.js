import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import Navbar from './Navbar';

const PositionNew = (props) => {
  const [user, setUser] = useState({})
  const [loaded, setLoaded] = useState([]);
  const [errs, setErrs] = useState({});
  const [state, setState] = useState({
    name: '',
    description: '',
    skills: [],
    org_id: ''
  });
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/loggedIn", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data)
        setLoaded(true);
      })
      .catch(err => console.log('something is errored out' + err))
  }, [])

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/position', state)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrs(res.data.errors);
        } else {
          console.log(res.data._id);
          navigate(`/orgs/dashboard`);
        }
      })
      .catch((err) => console.log(err));
  };//end submitForm

  return (
    <div>
      <Navbar />
      <div className='w-75 mx-auto pt-2 border border-dark p-2'>
        <h1 className='bg-primary text-center'>Add A Poition</h1>
      <div className='w-50 mx-auto pt-2'>
      
      <form onSubmit={submitForm} action="/action_page.php" className="needs-validation" novalidate>
        <div className="form-group">
          <label for="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" onChange={(e) => onChange(e)} required />
          {errs.name ? (
            <span className='text-danger'>{errs.name.message}</span>
          ) : null}
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Enter Description" name="description" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label for="skills">Skills</label>
          <input type="text" className="form-control" id="skills" placeholder="Enter Skills" name="skills" onChange={(e) => onChange(e)} required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
            <button type="submit" className="btn btn-primary btn-sm mb-2 "><Link className='text-white' to={`/orgs/dashboard`}>Add Poition</Link></button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default PositionNew;
