import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './assets/attendence.css';

const Attendance = () => {
  const [empId, setEmpId] = useState('');
  const [punchInTime, setPunchInTime] = useState('');
  const [punchOutTime, setPunchOutTime] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const EmpId=localStorage.getItem(empId);
  // Calculate duration whenever punchInTime or punchOutTime changes
  useEffect(() => {
    if (punchInTime && punchOutTime) {
      const punchIn = moment(`${date} ${punchInTime}`);
      const punchOut = moment(`${date} ${punchOutTime}`);
      const durationHours = punchOut.diff(punchIn, 'hours', true);
      setDuration(durationHours);
    } else {
      setDuration(null);
    }
  }, [punchInTime, punchOutTime, date]);

  const handleAttendanceSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3004/api/attendance', {
        empId:EmpId,
        punchIn: `${date} ${punchInTime}`,
        punchOut: `${date} ${punchOutTime}`,
        date,
        duration
      });

      setSuccessMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while saving attendance');
      setSuccessMessage('');
    }
  };

  return (
    <div align='center' className='attend'>
      <h2>Attendance Form</h2>
      <label>Punch In Time :</label> <input type="time" value={punchInTime} onChange={(e) => setPunchInTime(e.target.value)} /><br/>
      <label>Punch Out Time : </label><input type="time" value={punchOutTime} onChange={(e) => setPunchOutTime(e.target.value)} /><br/>
      <label>Date :</label> <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br/>
      <button className='auth-btn' onClick={handleAttendanceSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Attendance;
