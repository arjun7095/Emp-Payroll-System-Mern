import React, { useState } from 'react';
import axios from 'axios';
import './assets/WorkShedule.css';

const WorkSchedule = () => {
  const [empId, setEmployeeId] = useState('');
  const [work, setWorkDetails] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [resultArray,setResultArray]=useState([]);

  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleAssignWork = async () => {
    try {
      const formattedDate = formatDate(date);
      const response = await axios.post('http://localhost:3004/api/admin/assign', {
        empId,
        work,
        date: formattedDate,
      });
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
      setSuccessMessage('');
    }
  };

  const handleGetWorkSchedule = async () => {
    try {
      const formattedDate = formatDate(date);
      const response = await axios.get(`http://localhost:3004/api/admin/${formattedDate}`);
      setResultArray(response.data.workSchedule);
      setError(null);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className='work' style={{backgroundImage:'url("images/home2.jpg")',backgroundSize:'cover',height:'100vh'}}align='center'>
      <fieldset align='center'className='work-field'>
      <h2>Assign Work</h2>
      <input type="text" placeholder="Employee ID" value={empId} onChange={e => setEmployeeId(e.target.value)} required /><br/>
      <input type="text" placeholder="Work Details" value={work} onChange={e => setWorkDetails(e.target.value)} required/><br/>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br/>
      <button className='auth-btn' onClick={handleAssignWork}>Assign Work</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </fieldset>
      <hr/>
      <h2>Get Work Schedule</h2>
      <hr/>
      <label>Select Date:</label> <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br/>
      <button className='auth-btn' onClick={handleGetWorkSchedule}>Get Work Schedule</button>
      <h1></h1>
      {resultArray.length > 0 && (
        <table border="2px" cellSpacing="0" width="800" align='center'>
          <thead>
            <tr align='center'>
              <th>Employee ID</th>
              <th>Work Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {resultArray.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.empId}</td>
                <td>{schedule.work}</td>
                <td>{schedule.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
           
    </div>
  );
};

export default WorkSchedule;
