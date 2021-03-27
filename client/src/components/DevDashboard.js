import React, { useState, useEffect } from 'react';
import { navigate, Link } from '@reach/router';
import axios from 'axios';
import { Row, Col } from 'antd';
import Navbar from './Navbar';

const DevDashboard = (props) => {
  const [allpositions, setAllpositions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/position', {
        withCredentials: true
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
      <div className='w-25 mx-auto pt-2'>
        <h5 className='text-capitalize text-decoration-underline'>Positions To Fill</h5>
        {allpositions.map((element, index) => (
          <div>
            <div>
              {element.name}
            </div>
            <div>
              <button type="button" className="btn btn-primary text-capitalize w-50 mx-auto m-2 p-0">Apply</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DevDashboard;
