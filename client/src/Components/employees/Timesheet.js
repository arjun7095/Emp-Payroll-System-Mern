import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timesheet = () => {
  const [empId, setEmpId] = useState('');
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get empId from local storage
    const empIdFromStorage = localStorage.getItem('empId');
    if (empIdFromStorage) {
      setEmpId(empIdFromStorage);
    }
  }, []);

  useEffect(() => {
    if (empId) {
      // Fetch timesheet details for the specific empId
      const fetchTimesheets = async () => {
        try {
          const response = await axios.get(`http://localhost:3004/api/timesheets/${empId}`);
          setTimesheets(response.data.timesheets);
          setError('');
        } catch (error) {
          setError('Error fetching timesheets');
          console.error('Error fetching timesheets:', error);
        }
      };

      fetchTimesheets();
    }
  }, [empId]);

  return (
    <div align='center' style={ {backgroundColor:'rgb(25, 25, 40)',color:'white',height:'100vh'}}>
      <h2>Timesheets for Employee ID: {empId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="2px" cellSpacing="0" width="800">
        <thead>
          <tr>
            <th>Date</th>
            <th>Punch In</th>
            <th>Punch Out</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet, index) => (
            <tr key={index}>
              <td>{timesheet.date}</td>
              <td>{timesheet.punchIn}</td>
              <td>{timesheet.punchOut}</td>
              <td>{timesheet.duration} hours</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
