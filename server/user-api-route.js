const express = require('express');
const router = express.Router();
const EmployeesModel = require('./model/emp-model');
const SalaryModel =require('./model/salary-model');
const Leaves =require('./model/leaves-model');
const WorkSchedule =require('./model/work-model');
const TimeSheet =require('./model/timesheet-model');




// Get employee data by email
router.get('/employee/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const employee = await EmployeesModel.findOne({ email });
   
    res.json({employee });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee data' });
  }
});

// Update employee data
router.put('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const { name,category,address } = req.body;
  try {
    await EmployeesModel.findByIdAndUpdate(id, { name,category,address });
    res.json({ message: 'Employee data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating employee data' });
  }
});

// Delete employee account
router.delete('/employee/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await EmployeesModel.findByIdAndDelete(id);
    res.json({ message: 'Employee account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee account' });
  }
});

router.post('/employee', async (req, res) => {
  try {
    // Extract data from request body
    const {empId, email, name, category, salary, address } = req.body;

    // Create a new Employee document
    const newEmployee = new EmployeesModel({
      empId,
      email,
      name,
      category,
      salary,
      address
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Respond with the newly created employee
    res.status(201).json({ employee: newEmployee });
  } catch (error) {
    // Handle errors
    console.error('Error adding employee details:', error);
    res.status(500).json({ error: 'An error occurred while adding employee details' });
  }
});




router.get('/employee/salary/:empId/:year/:month', async (req, res) => {
  const { empId, year, month } = req.params;
  
  // Check if empId is not a valid number
  if (isNaN(empId)) {
    return res.status(400).json({ error: 'Invalid employee ID' });
  }

  try {
    // Fetch salary data for the specified employee ID, year, and month
    const salaryData = await SalaryModel.find({ empId, year, month });
    res.json({ salaryData });
    console.log({salaryData});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching salary data.' });
  }
});



router.post('/employee/leave', async (req, res) => {
  try {
    const { empId, name, leaveType, startDate, endDate, reason, status } = req.body;
    // Create a new leave application
    const newLeave = new Leaves({ empId, name, leaveType, startDate, endDate, reason, status });
    await newLeave.save();
    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to submit leave application' });
  }
});



router.get('/schedule/:date/:empId', async (req, res) => {
  const { date, empId } = req.params;

  try {
    // Query the database for the schedule details matching the given date and empId
    const scheduleDetails = await WorkSchedule.find({ date, empId });

    if (!scheduleDetails) {
      return res.status(404).json({ message: 'Schedule details not found' });
    }

    res.status(200).json({ scheduleDetails });
  } catch (error) {
    console.error('Error fetching schedule details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/attendance', async (req, res) => {
  const { empId, punchIn, punchOut, date,duration } = req.body;
  
  try {
    const newAttendance = new TimeSheet({
      empId,
      punchIn: punchIn,
      punchOut: punchOut,
      date: new Date(date),
      duration:duration
      
    });
   
    await newAttendance.save();
    res.status(200).json({ message: 'Attendance saved successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'An error occurred while saving attendance' });
  }
});

// GET timesheets by employee ID
router.get('/timesheets/:empId', async (req, res) => {
  const { empId } = req.params;

  try {
    // Find all timesheets for the specified employee ID
    const timesheets = await TimeSheet.find({ empId });

    if (!timesheets) {
      return res.status(404).json({ message: 'Timesheets not found for this employee ID' });
    }

    res.status(200).json({ timesheets });
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    res.status(500).json({ error: 'An error occurred while fetching timesheets' });
  }
});

module.exports = router;
