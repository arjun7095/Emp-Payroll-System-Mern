import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/salary.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [newEmployeeId, setNewEmployeeId] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeSalary, setNewEmployeeSalary] = useState('');

  useEffect(() => {
    // Fetch salary data by month and year
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/api/admin/salary/${selectedYear}/${selectedMonth}`);
        setSalaryData(response.data.salaryData || []);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching salary data.');
      }
    };

    if (selectedMonth && selectedYear) {
      fetchSalaryData();
    }
  }, [selectedMonth, selectedYear]);

  // Function to calculate PF deduction
  const calculatePFDeduction = (salary) => {
    return salary * 0.12; // Assuming PF deduction is 12% of the salary
  };

  // Function to calculate tax deduction (dummy implementation)
  const calculateTaxDeduction = (salary) => {
    return salary * 0.1; // Assuming tax deduction is 10% of the salary
  };

  const handleAddSalary = async () => {
    try {
      await axios.post('http://localhost:3004/api/admin/salary', {
        empId: newEmployeeId,
        name: newEmployeeName,
        salary: newEmployeeSalary,
        month: selectedMonth,
        year: selectedYear,
      });
      // Refresh salary data after adding new entry
      setSelectedMonth('');
      setSelectedYear('');
      setNewEmployeeId('');
      setNewEmployeeName('');
      setNewEmployeeSalary('');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while adding salary.');
    }
  };

  const handleUpdateSalary = async () => {
    if (!selectedEmployee) return; // Check if employee is selected

    try {
      await axios.put(`http://localhost:3004/api/admin/salary/${selectedEmployee.empId}/${selectedYear}/${selectedMonth}`, {
        salary: selectedEmployee.salary,
      });
      // Refresh salary data after updating
      setSelectedEmployee(null); // Reset selected employee after updating
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while updating salary.');
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('salary-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('payroll.pdf');
    });
  };

  return (
    <div align='center' className='salary'>
      <h2>Salary Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="month">Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Select Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <label htmlFor="year">Select Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div>
        <h2>Add New Salary</h2>
        <input type="text" placeholder="Employee ID" value={newEmployeeId} onChange={(e) => setNewEmployeeId(e.target.value)} />
        <input type="text" placeholder="Employee Name" value={newEmployeeName} onChange={(e) => setNewEmployeeName(e.target.value)} />
        <input type="text" placeholder="Salary" value={newEmployeeSalary} onChange={(e) => setNewEmployeeSalary(e.target.value)} />
        <button className='auth-btn' onClick={handleAddSalary}>Add Salary</button>
      </div>
      <div id="salary-table">
        <h1>Mphasis EPM System</h1>
        <h2>Date: {selectedMonth}/ {selectedYear}</h2>
      {salaryData.length > 0 && (
        <table border="2px" cellSpacing="0" width="800">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>PF Deduction</th>
              <th>Tax Deduction</th>
              <th>Net Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary) => (
              <tr key={salary._id}>
                <td>{salary.empId}</td>
                <td>{salary.name}</td>
                <td>{salary.salary}</td>
                <td>{calculatePFDeduction(salary.salary)}</td>
                <td>{calculateTaxDeduction(salary.salary)}</td>
                <td>{salary.salary - calculatePFDeduction(salary.salary) - calculateTaxDeduction(salary.salary)}</td>
                <td>
                  <button className='auth-btn' onClick={() => setSelectedEmployee(salary)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      <div>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
      {selectedEmployee && (
        <div>
          <h3>Edit Salary</h3>
          <input type="text" value={selectedEmployee.empId} disabled />
          <input type="text" value={selectedEmployee.name} disabled />
          <input type="text" value={selectedEmployee.salary} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })} />
          <button onClick={handleUpdateSalary}>Update Salary</button>
        </div>
      )}
    </div>
  );
};

export default Salary;
