import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import { Row, Col } from 'antd';
import Navbar from './Navbar';

const Dashboard = (props) => {
  const [alldevs, setAlldevs] = useState([]);
  const [position, setposition] = useState({});
  const [loaded, setLoaded] = useState(false);

  const getLoggedInUser = () => {
    axios
      .get("http://localhost:8000/api/user/loggedin", {
        withCredentials: true
      })
      .then(res => console.log(res))
      .catch(console.log);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/position/${props.posId}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log('res.data');
        // console.log(res);
        setposition(res.data);
        console.log(position);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/availableDevs/${props.posId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('res.data');
        console.log(res.data);
        setAlldevs(res.data);
        console.log(alldevs);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);


  
  
  return (
    <div>
      <Navbar />
      <div className='text-center border border-dark'>
         {position.name}
      </div>
      <h5 className='m-1'>Available Devs</h5>
      <div className='myscroll'>
        {alldevs.map((element, index) => (
          <div className='border border-dark p-2'>
            <div>
              {element.name}
            </div>
            <div>
              {element.skills}
            </div>
            <div>
              {element.percentMatch}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

