import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import { Row, Col } from 'antd';
import Navbar from './Navbar';

const OrgDashboard = (props) => {
  const [alldevs, setAlldevs] = useState([]);
  const [allpositions, setAllpositions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/dev', {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res.data');
        console.log(res);
        setAlldevs(res.data);
        console.log(alldevs);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get('http://localhost:8000/api/position', {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res.data');
        console.log(res);
        setAllpositions(res.data);
        console.log(allpositions);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div>
      <Navbar />
      
      <div className='container'>
        <div className='row'>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 border border-dark'>
            <button type="button" className="btn btn-primary btn-block p-0 m-1 text-capitalize mb-2"><Link className="text-white" to={`/orgs/jobs/new`}>List a new position</Link></button>
            <div className='border border-dark'>
              <h5 className='text-capitalize m-2'>Positions To Fill</h5>
              {allpositions.map((element, index) => (
                <div className='m-2'>
                  <Link className='text-decoration-underline' to={`/orgs/jobs/${element._id}`}>{element.name}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 border border-dark'>
            <h5>Available Devs</h5>
            <div className='myscroll'>
            {alldevs.map((element, index) => (
              <div className='border border-dark p-2'>
                <div>
                  {element.firstName} {element.lastName}
                </div>
                <div>
                  {element.language} 
                </div>
                <div>
                  {element.bio}
                </div>
              </div>
            ))}
            </div>
          </div>

        </div>

      </div> 

    </div>
  );
};

export default OrgDashboard;

