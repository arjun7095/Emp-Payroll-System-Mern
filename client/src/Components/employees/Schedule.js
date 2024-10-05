import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/schedule.css';

const Schedule = () => {
  const [scheduleDetails, setScheduleDetails] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const empId = localStorage.getItem('empId'); // Assuming empId is stored in local storage

  useEffect(() => {
    const handleGetWorkSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/schedule/${date}/${empId}`);
        setScheduleDetails(response.data.scheduleDetails);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred while fetching work schedule.');
      }
    };

    if (date && empId) {
      handleGetWorkSchedule();
    }
  }, [date, empId]);

  return (
    <div align='center' className='schedule'>
      <h2>Schedule Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <div>
        <table border="2px" cellSpacing="0" width="800">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Work</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scheduleDetails.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.empId}</td>
                <td>{schedule.work}</td>
                <td>{schedule.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
