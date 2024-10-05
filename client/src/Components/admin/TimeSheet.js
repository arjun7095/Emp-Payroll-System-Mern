import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/Timesheet.css'

const Timesheet = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    getTimesheets();
  }, [date]);

  const getTimesheets = async () => {
    try {
      const formattedDate = new Date(date).toISOString(); // Format date as ISO string
      const response = await axios.get(`http://localhost:3004/api/admin/timesheet/${formattedDate}`);
      setTimesheets(response.data.timesheets);
      setError(null);
    } catch (error) {
      setError('No data found');
      console.error(error);
    }
  };

  return (
    <div align='center' className='time'>
      <h2>Timesheet</h2>
      <label>Select Date: </label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {error && <p>{error}</p>}
      <table border="2px" cellSpacing="0" width="1000">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Punch In</th>
            <th>Punch Out</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet, index) => (
            <tr key={index}>
              <td>{timesheet.empId}</td>
              <td>{timesheet.punchIn}</td>
              <td>{timesheet.punchOut}</td>
              <td>{timesheet.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
